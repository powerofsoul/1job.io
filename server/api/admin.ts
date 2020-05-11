import { Router } from "express";
import { isAdmin } from "../middleware/middleware";
import { JobService } from "../services/JobService";
const router = Router();

router.post("/postJob", isAdmin, async (req, res) => {
    const {job} = req.body;
    
    res.json(await JobService.create(job, req.user));
})

export default router;