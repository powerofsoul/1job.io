import { Router } from "express";
import { authenticate } from "passport";
import passport from "passport";
import UserModel, { User } from "../../models/UserModel";

const router = Router();

router.post("/login", authenticate('local'), (req, res) => {
    res.json(req.user);
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.post("/register", (req, res) => {
    const user: User = req.body.user;

    UserModel.create(user)
        .then((r) => res.json(r))
        .catch((err) => res.status(500).json(err));
});

router.get('/me',
    passport.authorize('local'),
    (req, res) => res.json({ id: req.user.id, username: req.user.email })
);


export default router;