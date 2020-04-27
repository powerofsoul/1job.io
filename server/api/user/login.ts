import {Router} from "express";
import { authenticate } from "passport";

const router = Router();

router.post("/", authenticate('local'), (req, res) => {
    res.json(req.user);
})

export default router;