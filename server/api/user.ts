import { Router } from "express";
import { authenticate } from "passport";
import { isAuthenticated } from "../middleware/middleware";
import fs from "fs";
import { User } from "../../models/User";
import UserModel from "../../models/mongo/UserModel";
import FileStore from "../services/FileService";
import MailService from "../services/MailService";
import { WelcomeTemplate, ForgotPassTemplate } from "../mail/Template";
import config from "../config";
import EmployerModel from "../../models/mongo/EmployerModel";
const path = require('path');

const router = Router();

router.post("/login", authenticate('local'), (req, res) => {
    const isActivated = req.user.activated;
    if (isActivated) {
        res.json({
            success: true,
            user: req.user
        })
    } else {
        res.json({
            success: false,
            message: "Please check your emai and click the activation link."
        })
    }
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.post("/register", async (req, res) => {
    const user: User = req.body.user;

    UserModel.create({
        ...user,
        _employer: await EmployerModel.create(user._employer)
    }).then((u) => {
        const template = WelcomeTemplate({
            companyName: u?._employer.companyName,
            activationString: u.activationString,
            domain: config.hostname
        });
        MailService.notify(user.email, "Welcome!", template);

        req.login(u, () => {
            res.json({ success: true, message: "Please check your email for the activation link." })
        });
    }).catch((err) => {
        let message = "Something went wrong. Please contact the administrator!";

        if (err.keyPattern?.email == 1 || Object.keys(err.errors).indexOf("email") >= 0) {
            message = "Email already used or incorrect.";
        }

        res.json({ success: false, message })
    });

});

router.post("/activate", (req, res) => {
    UserModel.findOne({ activationString: req.body.activationString }).then((user) => {
        if (user.activated) {
            res.json({
                success: false,
                message: "Account already activated."
            })
        } else {
            user.activated = true;
            user.save().then(() => {
                res.json({
                    success: true,
                    message: "Your account has been activated."
                })
            }).catch(() => res.status(500).send());
        }
    }).catch(() => {
        res.status(500).send();
    })
})

router.post("/changepass", async (req, res) => {
    if (req.isAuthenticated()) {
        const { currentPassword, newPassword } = req.body;

        const validCurrentPassword = await req.user.comparePassword(currentPassword);
        if (!validCurrentPassword) {
            res.json({
                success: false,
                message: "Invalid current password."
            });
        } else {
            req.user.password = newPassword;
            req.user.save().then(() => {
                res.json({
                    success: true
                })
            }).catch(() => {
                res.json({
                    success: false
                })
            });
        }
    } else {
        const { token, newPassword } = req.body;
        if (!token || token == "") {
            res.json({
                success: false,
                message: "Invalid token."
            })
        } else {
            UserModel.findOne({ forgotPasswordString: token }).then((user) => {
                user.password = newPassword;
                user.forgotPasswordString = "";

                user.save().then(() => {
                    res.json({
                        success: true
                    })
                }).catch(() => {
                    res.json({
                        success: false,
                        message: "Something went wrong."
                    })
                });
            }).catch(() => {
                res.json({
                    success: false,
                    message: "Invalid token."
                })
            })
        }
    }
})

router.post("/forgotpass", (req, res) => {
    const { email } = req.body;

    UserModel.findOne({
        email
    }).then((user) => {
        user.generateForgotPass();

        const forgotPassTemplate = ForgotPassTemplate({
            companyName: user.email,
            hash: user.forgotPasswordString,
            domain: config.hostname
        })

        MailService.notify(user.email, "Password recovery link", forgotPassTemplate);

        res.json({
            success: true,
            message: "Please check your inbox!"
        });
    }).catch(() => {
        res.json({
            success: true,
            message: "Please check your inbox 2!"
        });
    })
})

router.get('/me',
    isAuthenticated,
    (req, res) => {
        UserModel.findOne({
            _id: req.user._id
        }).populate("_employer").then((u) => {
            res.json(u);
        })
    }
);

router.get('/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findOne({ _id: id }).then((user) => {
        res.json({
            user
        })
    }).catch(() => {
        res.json({
            success: false
        })
    })
})

router.post("/update", async (req, res) => {
    const user = await UserModel.findById(req.user._id).populate("_employer");

    const employer = {
        ...user._employer.toObject(),
        ...req.body.user._employer
    };

    EmployerModel.updateOne({_id: user._employer._id}, employer).then(() => {
        res.json({
            success: true,
            user: user
        })
    }).catch(()=> {
        res.json({
            success: false,
            message: "Something went wrong"
        });
    })
})

router.post("/uploadAvatar", isAuthenticated, (req, res) => {
    const avatarName = `avatar/${req.user._id}${path.extname(req.files.avatar.name)}`;
    FileStore.upload(req.files.avatar.data, avatarName).then(async (url) => {
        const urlWithtime = `${url}?date=${new Date().getTime()}`;

        await UserModel.update(req.user, {
            avatar: urlWithtime
        })

        res.json({
            success: true,
            url: urlWithtime
        })
    }).catch((err) => res.status(500));
})


export default router;