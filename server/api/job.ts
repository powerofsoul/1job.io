import { Router } from "express";
import JobModel from "../../models/mongo/JobModel";
import { Job } from "../../models/Job";
import { isAuthenticated } from "../middleware/middleware";
const router = Router();

router.get('/all', async (req, res) => {
    const jobs = await JobModel.find().populate("company").sort({postedOn: "desc"});
    res.json(jobs);
});

router.get('/:id', async (req, res) => {
    const job = await JobModel.findOne({_id: req.params.id}).populate("company").sort({postedOn: "desc"});
    res.json(job);
});


router.post('/create', isAuthenticated, (req, res) => {
    JobModel.create({
        ...req.body.job,
        company: req.user._id,
        postedOn: new Date()
    }).then((r) => res.json(r))
        .catch((err) => res.status(500).json(err));
})

export default router;