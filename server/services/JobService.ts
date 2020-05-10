import { Employee } from "../../models/Employee"
import ApplicationModel from "../../models/mongo/ApplicationModel"

function apply (jobId: string, currentUser: Employee, coverLetter: string, answers: []){
    return new Promise((resolve) => {
        const application = new ApplicationModel({
            job: jobId,
            employee: currentUser._id,
            coverLetter: coverLetter,
            answers: answers
        })

        application.save().then(()=> {
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


export const JobService = {
    apply
}
