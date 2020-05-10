import { Document, model, Schema } from "mongoose";
import { Application } from "../Application";
import JobModel from "./JobModel";
import EmployeeModel from "./EmployeeModel";

export const ApplicationSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    coverLetter: String,
    answers: [{
        question: String,
        answer: String
    }],
})


export type ApplicationDocument = Application & Document;

ApplicationSchema.post('save', async function (doc) {
    const application = this as ApplicationDocument;
    await JobModel.updateOne({ 
        _id: application.job,
        applications: {
            $ne: application._id
        }
    }, {
        $push: {
            applications: application._id
        }
    })

    await EmployeeModel.updateOne({ 
        _id: application.employee,
        applications: {
            $ne: application._id
        }
    }, {
        $push: {
            applications: application._id
        }
    })
})

ApplicationSchema.index({ employee: 1, job: 1 }, { unique: true });

export default model<ApplicationDocument>("Application", ApplicationSchema);