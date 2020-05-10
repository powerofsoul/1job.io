import { Router } from "express";
import JobModel from "../../models/mongo/JobModel";
import { Job } from "../../models/Job";
import { isAuthenticated, isEmployee } from "../middleware/middleware";
import { Types } from "mongoose";
import UserModel from "../../models/mongo/UserModel";
import { payForJob as getJobIntent } from "../services/StripeService";
import EmployerModel from "../../models/mongo/EmployerModel";
import { JobService } from "../services/JobService";
import { Employee } from "../../models/Employee";
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
    const company = await EmployerModel.findOne({ _id: req.params.companyId })

    JobModel.find({ company: company })
        .populate("company")
        .then((jobs) => res.json({ jobs }))
        .catch(() => res.status(404).json({ success: false }));
})


router.put('/', isAuthenticated, (req, res) => {
    const job = {
        ...req.body.job,
        company: req.user._id,
    }

    if (job._id) {
        JobModel.updateOne({ _id: job._id, company: req.user }, job)
            .then((r) => {
                if (r.n == 0) {
                    res.status(401).json({
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

        const jobModel = new JobModel(job);
        if(req.body.token == undefined){
            res.json({
                success: false,
                message: "Invalid token from payment"
            })
            return;
        }
        jobModel.validate((err) => {
            if (err) {
                res.json({
                    success: false,
                    message: "Invalid job content. Please make sure you filled every required field."
                });
            } else {
                getJobIntent(req.body.token).then(async (payment) => {
                    if (payment.status == "succeeded") {
                        jobModel.paymentIntent = req.body.token;
                        const job = await jobModel.save();

                        res.json({
                            success: true,
                            message: "Job created",
                            job
                        });
                    } else {
                        res.json({
                            success: false,
                            message: payment.last_payment_error
                        })
                    }
                }).catch((err) => {
                    res.json({
                        success: false,
                        message: "Something went wrong"
                    });
                });
            }
        })
    }
})

router.post("/:id/apply", isEmployee, async (req, res) => {
    const respose = await JobService.apply(req.params.id, req.user as Employee, req.body.coverLetter);
    res.json(respose);
})

export default router;