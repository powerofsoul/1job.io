import { Router } from "express";
import UserModel, { User } from "../../../models/UserModel";

const router = Router();

router.post("/", (req, res) => {
    const user: User = req.body.user;

    UserModel.create(user)
        .then((r) => res.json(r))
        .catch((err) => res.status(500).json(err));
})

export default router;