import { Router } from "express";
import JobModel, { defaultJob, Job } from "../../models/JobModel";
const router = Router();

router.get('/', async (req, res) => {
    const jobs = await JobModel.find();
    res.json(jobs);
});

router.put('/', (req, res) => {
    const job: Job = req.body.job;
    job.postedOn = new Date();

    JobModel.insertMany(job)
        .then((r) => res.json(r))
        .catch((err) => res.status(500).json(err));
})

export default router;