import { Router } from "express";
import { authenticate } from "passport";
import passport from "passport";
import UserModel, { User } from "../../models/UserModel";
import { isAuthenticated } from "../middleware/middleware";

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

    UserModel.create( user)
        .then(( async (u) => {
            req.login(u, () => {
                res.json({ success: true, user: u})
            });
        }))
        .catch((err) => {
            let message = "Something went wrong. Please contact the administrator!";

            if(err.keyPattern?.email == 1 || Object.keys(err.errors).indexOf("email") >= 0) {
                message = "Email already used or incorrect.";
            }

            res.json({success: false, message})
        });
});

router.get('/me',
    isAuthenticated,
    (req, res) => res.json({ id: req.user.id, username: req.user.email })
);


export default router;