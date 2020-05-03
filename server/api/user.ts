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

router.post("/register", (req, res) => {
    const user: User = req.body;

    UserModel.create(user)
        .then((async (u) => {
            const template = WelcomeTemplate({ companyName: user.companyName, 
                    activationString: u.activationString,
                    domain: config.hostname
            });
            MailService.notify(user.email, "Welcome!", template);

            req.login(u, () => {
                res.json({ success: true, message: "Please check your email for the activation link." })
            });
        }))
        .catch((err) => {
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

router.post("/forgotpass", (req, res) => {
    const {email} = req.body;

    UserModel.findOne({
        email
    }).then((user)=> {
        user.generateForgotPass();

        const forgotPassTemplate = ForgotPassTemplate({
            companyName: user.companyName,
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

router.get('/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findOne({ _id: id }).then((user) => {
        res.json({
            user
        })
    }).catch(() => {
        res.status(500).send();
    })
})

router.get('/me',
    isAuthenticated,
    (req, res) => {
        res.json(req.user)
    }
);

router.post("/update", async (req, res) => {
    const user = req.body.user;
    //make sure to now update password
    delete user.password;

    await UserModel.findOneAndUpdate(
        { _id: req.user._id },
        user,
        { "new": true },
        function (err, user) {
            if (err) {
                res.json({
                    success: false
                })
            } else {
                res.json({
                    success: true,
                    user
                });
            }
        }
    );
})

router.post("/uploadAvatar", isAuthenticated, (req, res) => {
    const avatarName = `avatar/${req.user._id}${path.extname(req.files.avatar.name)}`;
    FileStore.upload(req.files.avatar.data, avatarName).then(async (url) => {
        const urlWithtime = `${url}?date=${new Date().getTime()}`;

        await UserModel.update(req.user, {
            companyImage: urlWithtime
        })

        res.json({
            success: true,
            url: urlWithtime
        })
    }).catch((err) => res.status(500));
})


export default router;