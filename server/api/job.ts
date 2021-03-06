import { Router } from "express";
import JobModel from "../../models/mongo/JobModel";
import { Job } from "../../models/Job";
import { isAuthenticated, isEmployee, isEmployer } from "../middleware/middleware";
import { Types } from "mongoose";
import UserModel from "../../models/mongo/UserModel";
import EmployerModel from "../../models/mongo/EmployerModel";
import { JobService } from "../services/JobService";
import { Employee } from "../../models/Employee";
const router = Router();

router.get('/all', async (req, res) => {
    const jobs = await JobModel.find({disabled: false}).populate("company").sort({ postedOn: "desc" });
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

router.get('/:id/applicants', isEmployer, (req, res) => {
    JobModel.findOne({ _id: req.params.id, company: req.user })
        .populate("company")
        .populate("applications")
        .populate({
            path: 'applications',
            populate: {
                path: "employee"
            }
        })
        .then((job) => res.json({
            success: true,
            job
        }))
        .catch(() => res.status(404).json({ success: false }));
});

router.get('/user/:companyId', async (req, res) => {
    const company = await EmployerModel.findOne({ _id: req.params.companyId })

    JobModel.find({ company: company })
        .populate("company")
        .then((jobs) => res.json({ jobs }))
        .catch(() => res.status(404).json({ success: false }));
})

router.post("/:id/changeStatus", isAuthenticated, (req, res) => {
    JobModel.updateOne({
        _id: req.params.id,
        company: req.user,
    }, {
        disabled: req.body.disabled
    }, {}, (err, raw) => {
        if(err){
            res.send({
                success: false,
                message: "Something went wrong"
            });
        } else {
            res.json({
                success: true,
                message: "Your job post status changed"
            });
        }
    })
})


router.put('/', isAuthenticated, (req, res) => {
    const job = req.body.job;
    
    if (job._id) {
        JobService.update(job, req.user).then((r) => res.send(r)).catch((err) => res.status(500).send(err));
    } else {
        JobService.create(job, req.user, req.body.token).then((r) => res.send(r)).catch((err) => res.status(500).send(err));;
    }
})

router.post("/:id/apply", isEmployee, async (req, res) => {
    const respose = await JobService.apply(req.params.id, req.user as Employee, req.body.coverLetter, req.body.answers);
    res.json(respose);
})

export default router;