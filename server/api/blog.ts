import { Router } from "express";
import { isAdmin } from "../middleware/middleware";
import BlogPost from "../../models/mongo/BlogPost";
const router = Router();

router.get("/", (req, res) => {
    BlogPost.find().then((doc) => {
        res.json(doc);
    })
})

router.get("/:title", (req, res) => {
    BlogPost.findOne({
        title: req.params.title
    }, (err, doc) => {
        if(err || !doc){
            res.status(404).send();
        } else {
            res.json(doc);
        }
    })
})

router.put("/", isAdmin, (req, res) => {
    BlogPost.create({
        ...req.body.blogPost, 
        author: req.user,
        postedOn: new Date()
    }).then(() => {
        res.json({
            success: true,
            message: "Blog post posted"
        })
    }).catch(()=> {
        res.json({
            success: false,
            message: "Something went wrong"
        })
    })
})

export default router;