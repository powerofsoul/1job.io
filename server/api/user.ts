import { Router } from "express";
import { authenticate } from "passport";
import passport from "passport";
import { isAuthenticated } from "../middleware/middleware";
import fs from "fs";
import { User } from "../../models/User";
import UserModel from "../../models/mongo/UserModel";
import FileStore from "../services/FileService";
import MailService from "../services/MailService";
const path = require('path');

const router = Router();

router.post("/login", authenticate('local'), (req, res) => {
    res.json(req.user);
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.post("/register", (req, res) => {
    const user: User = req.body;

    UserModel.create(user)
        .then((async (u) => {
            req.login(u, () => {
                res.json({ success: true, user: u })
            });

            MailService.notify(u.email, "Welcome!", "Thanks for joining jobs remotely!");
        }))
        .catch((err) => {
            let message = "Something went wrong. Please contact the administrator!";

            if (err.keyPattern?.email == 1 || Object.keys(err.errors).indexOf("email") >= 0) {
                message = "Email already used or incorrect.";
            }

            res.json({ success: false, message })
        });
});

router.get('/me',
    isAuthenticated,
    (req, res) => res.json(req.user)
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