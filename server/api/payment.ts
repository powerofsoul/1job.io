import { Router } from "express";
import { isAuthenticated } from "../middleware/middleware";
import { createIntent } from "../services/StripeService";
const router = Router();

router.post("/createIntent", isAuthenticated, (req, res) => {
    createIntent(req.user).then((intent)=>{
        res.json({
            success: true,
            secret: intent.client_secret
        })
    }).catch((err)=>{
        res.json({
            success: false,
            message: "Something went wrong"
        })
    })
})

export default router;