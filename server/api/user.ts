import { Router } from "express";
import { authenticate } from "passport";
import UserModel from "../../models/mongo/UserModel";
import { User } from "../../models/User";
import config from "../config";
import { ForgotPassTemplate } from "../mail/Template";
import { isAuthenticated, isEmployee } from "../middleware/middleware";
import FileStore from "../services/FileService";
import MailService from "../services/MailService";
import { UserService } from "../services/UserService";
import JobModel from "../../models/mongo/JobModel";
import { v4 as uuidv4 } from 'uuid';
import EmployeeModel from "../../models/mongo/EmployeeModel";
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

    const response = await UserService.createUser(user);
    res.json(response);
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
            message: "Please check your inbox!"
        });
    })
})

router.get('/me',
    isAuthenticated,
    (req, res) => {
        UserModel.findOne({
            _id: req.user._id
        }).populate("applications").then((u) => {
            res.json(u);
        })
    }
);

router.get('/me/jobs',
    isAuthenticated,
    (req, res) => {
        JobModel.find({
            company: req.user
        }).populate("company").then((jobs) => {
            res.json({
                success: true,
                jobs
            });
        }).catch(()=> {
            res.json({
                success: false,
                message: "Something went wrong"
            })
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

router.post("/update", isAuthenticated, async (req, res) => {
    const user = req.body.user;
    const response = await UserService.updateCurrentUser(user, req.user);

    res.json(response);
})

router.post("/cancelMailChange", isAuthenticated, async (req, res) => {
    const response = await UserService.updateCurrentUser({
        newEmail: "",
        newEmailString: ""
    }, req.user);

    res.json(response);
})

router.post("/changeEmail", isAuthenticated, (req, res) => {
    const hash = req.body.hash;
    UserModel.findOne({
        newEmailString: hash
    }, async (err, user) => {
        if (err || !user) {
            res.json({
                success: false,
                message: "Invalid token"
            });
        } else {
            const updatedResponse = await UserService.updateUser(UserModel, user._id,
                {
                    newEmailString: "",
                    newEmail: "",
                    email: user.newEmail
                })

            res.json(updatedResponse);
        }
    })
})

router.post("/uploadImage", isAuthenticated, (req, res) => {
    const avatarName = `${uuidv4()}${path.extname(req.files.avatar.name)}`;
    FileStore.upload(req.files.avatar.data, avatarName).then(async (url) => {
        const urlWithtime = `${url}?date=${new Date().getTime()}`;

        res.json({
            success: true,
            url: urlWithtime
        })
    }).catch((err) => res.status(500));
})

router.post("/uploadResumee", isAuthenticated, isEmployee, (req, res) => {
    const resumee = `${req.user._id}_resumee${path.extname(req.files.resumee.name)}`;
    FileStore.upload(req.files.resumee.data, resumee).then(async (url) => {
        const urlWithtime = `${url}?date=${new Date().getTime()}`;
        EmployeeModel.updateOne({_id: req.user._id}, {
            resumee: url
        }).then(() => {
            res.json({
                success: true,
                url: urlWithtime,
                message: "Resumee uploaded"
            })
        }).catch(() => {
            res.json({
                success: false,
                message: "Someting went wrong."
            })
        })
    }).catch((err) => res.status(500));
})


export default router;