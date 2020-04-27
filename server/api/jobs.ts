import { Router } from "express";
import Job, { defaultJob } from "../../models/Job";
const router = Router();

router.get('/', async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

router.put('/', (req, res) => {
    Job.insertMany(defaultJob());
    res.json({
        success: true
    })
})

export default router;