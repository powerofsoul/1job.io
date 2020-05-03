import { Router } from "express";
import JobModel from "../../models/mongo/JobModel";
import { Job } from "../../models/Job";
import { isAuthenticated } from "../middleware/middleware";
import { Types } from "mongoose";
import UserModel from "../../models/mongo/UserModel";
const router = Router();

router.get('/all', async (req, res) => {
    const jobs = await JobModel.find().populate("company").sort({ postedOn: "desc" });
    res.json(jobs);
});

router.post("/filter", async (req, res) => {
    const filterQ = req.body.query;

    const Query = {};

    if (filterQ.title) {
        Query['title'] = {
            $regex: `.*(${filterQ.title.replace(/\s+/g, '|')}).*`,
            $options: "i"
        }
    }

    if (filterQ.category?.length > 0) {
        Query["category"] = {
            $in: filterQ.category
        }
    }

    if (filterQ.regions?.length > 0) {
        Query["regions"] = {
            $in: filterQ.regions
        }
    }


    if (filterQ.experienceLevel?.length > 0) {
        Query["experienceLevel"] = {
            $in: filterQ.experienceLevel
        }
    }

    if (filterQ.experienceLevel?.length > 0) {
        Query["experienceLevel"] = {
            $in: filterQ.experienceLevel
        }
    }

    if (filterQ.type?.length > 0) {
        Query["type"] = {
            $in: filterQ.type
        }
    }

    const jobs = await JobModel.find(Query).populate("company").sort({ postedOn: "desc" });

    res.json(jobs);
})

router.get('/:id', (req, res) => {
    JobModel.findOne({ _id: req.params.id })
        .populate("company")
        .then((job) => res.json(job))
        .catch(() => res.status(404).json({ success: false }));
});

router.get('/user/:companyId', async (req, res) => {
    const company = await UserModel.findOne({_id:  req.params.companyId})

    JobModel.find({company: company})
        .populate("company")
        .then((jobs) => res.json({jobs}))
        .catch(() => res.status(404).json({ success: false }));
})


router.put('/', isAuthenticated, (req, res) => {
    const job = {
        ...req.body.job,
        company: req.user._id,
    }

    if (job._id) {
        JobModel.updateOne({ _id: job._id, company: req.user._id }, job)
            .then((r) => {
                if (r.n == 0) {
                    res.status(401).send({
                        success: false,
                        message: "Unable to find requested job"
                    });
                } else {
                    res.json({
                        success: true
                    })
                }
            })
            .catch((err) => res.status(500).json(err));
    } else {
        job.postedOn = new Date();

        JobModel.create(job)
            .then((r) => res.json(r))
            .catch((err) => res.status(500).json(err));
    }

})

export default router;