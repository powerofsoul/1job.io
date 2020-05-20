import { Router } from "express";
import NewsletterModel from "../../models/mongo/NewsletterModel";
import { isAdmin } from "../middleware/middleware";
import MailService from "../services/MailService";
import { NewsletterTemplate } from "../mail/Template";
const router = Router();

router.post('/subscribe', (req, res) => {
    const successMessage = "You are now subscribed to our job newsletter!";
    
    NewsletterModel.create(req.body.subscription).then(() => {
        res.send({
            success: true,
            message: successMessage
        });

        const newsletterTemplate = NewsletterTemplate();
        MailService.notify(req.body.subscription.email, "You are now subscribed to 1job newsletter", newsletterTemplate);
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

router.get("/all", isAdmin, (req, res) =>{
    NewsletterModel.find().then((docs) => res.json(docs));
});

router.post("/update", isAdmin, (req, res) => {
    NewsletterModel.findOneAndUpdate({_id: req.body.id}, {
        ...req.body.newsletter
    }, {new: true}).then((newsletter) => {
        res.send({
            success: true,
            message: "Newsletter updated",
            newsletter
        })
    }).catch((err) => {
        res.send({
            success: false, 
            message: err.message || err.toString()
        })
    })
})

export default router;