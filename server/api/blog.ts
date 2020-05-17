import { Router } from "express";
import { isAdmin } from "../middleware/middleware";
import BlogPost from "../../models/mongo/BlogPostModel";
import { BlogService } from "../services/BlogService";
const router = Router();

router.get("/", (req, res) => {
    BlogPost.find().sort({ postedOn: "desc" }).then((doc) => {
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

router.put("/", isAdmin, async (req, res) => {
    if(req.body.blogPost._id) {
        const response = await BlogService.update(req.body.blogPost._id, req.body.blogPost);
        res.json(response);
    } else {
        const response = await BlogService.create(req.body.blogPost, req.user);
        res.json(response);
    }
})

export default router;