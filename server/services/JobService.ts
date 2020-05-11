import { Employee } from "../../models/Employee"
import ApplicationModel from "../../models/mongo/ApplicationModel"
import JobModel from "../../models/mongo/JobModel"
import { Job } from "../../models/Job"
import { Employer } from "../../models/Employer"
import { payForJob } from "./StripeService"

function apply(jobId: string, currentUser: Employee, coverLetter: string, answers: []) {
    return new Promise((resolve) => {
        const application = new ApplicationModel({
            job: jobId,
            employee: currentUser._id,
            coverLetter: coverLetter,
            answers: answers
        })

        application.save().then(() => {
            resolve({
                success: true
            })
        }).catch((err) => {
            resolve({
                success: false,
                message: err
            })
        })
    })
}

function create(job: Job, currentUser: Employer, paymentIntent?: string) {
    job.postedOn = new Date();
    job.company = currentUser;
    return new Promise(async (resolve) => {
        const jobModel = new JobModel(job);

        if(currentUser.isAdmin) {
            const job = await jobModel.save();

            resolve({
                success: true,
                message: "Job created",
                job
            });

            return;
        }


        if (paymentIntent == undefined) {
            resolve({
                success: false,
                message: "Invalid token from payment"
            })
            return;
        }

        payForJob(paymentIntent).then(async (payment) => {
            if (payment.status == "succeeded" || payment.status == "processing") {
                jobModel.paymentIntent = paymentIntent;
                const job = await jobModel.save();

                resolve({
                    success: true,
                    message: "Job created",
                    job
                });
            } else {
                resolve({
                    success: false,
                    message: payment.last_payment_error
                })
            }
        }).catch((err) => {
            resolve({
                success: false,
                message: "Something went wrong"
            });
        });
    })

}

function update(job: Job, currentUser: Employer) {
    delete job.postedOn;

    return new Promise((resolve, reject) => {
        JobModel.updateOne({ _id: job._id, company: currentUser }, job)
            .then((r) => {
                if (r.n == 0) {
                    resolve({
                        success: false,
                        message: "Unable to find requested job"
                    });
                } else {
                    resolve({
                        success: true
                    })
                }
            })
            .catch((err) => reject(err));
    })
}


export const JobService = {
    apply, update, create
}
