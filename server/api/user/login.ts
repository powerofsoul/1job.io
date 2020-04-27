import {Router} from "express";
import { authenticate } from "passport";

const router = Router();

router.post("/", authenticate('local'), (req, res) => {
    res.send("Auth Done");
})

export default router;