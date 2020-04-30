import { Router } from "express";
import JobModel from "../../models/mongo/JobModel";
import { Job } from "../../models/Job";
import { isAuthenticated } from "../middleware/middleware";
const router = Router();

router.get('/all', async (req, res) => {
    const jobs = await JobModel.find().populate("company").sort({postedOn: "desc"});
    res.json(jobs);
});

router.get('/:id', (req, res) => {
    JobModel.findOne({_id: req.params.id})
        .populate("company")
        .then((job) =>res.json(job))
        .catch(() => res.status(404).json({success: false}));
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