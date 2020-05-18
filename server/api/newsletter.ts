import { Router } from "express";
import NewsletterModel from "../../models/mongo/NewsletterModel";
import { isAdmin } from "../middleware/middleware";
import MailService from "../services/MailService";
const router = Router();

router.post('/subscribe', (req, res) => {
    const successMessage = "You are now subscribed to our job newsletter!";
    
    NewsletterModel.create(req.body.subscription).then(() => {
        res.send({
            success: true,
            message: successMessage
        });

        MailService.notify("florinmunteanu96@gmail.com", "New subscriber", `New subscriber ${JSON.stringify(req.body.subscription)}`);
    }).catch(err => {
        if(err.code == 11000) {
            res.send({
                success: true,
                message: successMessage
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try again later."
            })
        }
    })
});

router.post("/approve", isAdmin, (req, res) => {
    NewsletterModel.updateOne({_id: req.body._id}, {
        approved: req.body.approved
    }).then(() => {
        res.send({
            success: true,
            message: "done"
        })
    }).catch((err) => {
        res.send({
            success: false, 
            message: err.message || err.toString()
        })
    })
})

export default router;