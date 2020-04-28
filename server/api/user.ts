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
                res.json({ success: u != undefined})
            });
        }))
        .catch((err) => res.status(500).json({success: false, error: "Make sure everything is filled correctly!"}));
});

router.get('/me',
    isAuthenticated,
    (req, res) => res.json({ id: req.user.id, username: req.user.email })
);


export default router;