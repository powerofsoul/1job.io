import { Schema, model, Document } from "mongoose";
import { Job, JobExeperienceLevels, JobCategories, JobRegions, JobTypes } from "../Job";
import { UserSchema } from "./UserModel";
const xss = require("xss");

export const JobSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Employer',
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: JobTypes,
    },
    experienceLevel: {
        type: [String],
        enum: JobExeperienceLevels,
    },
    regions: {
        type: [String],
        enum: JobRegions,
    },
    category: {
        type: String,
        enum: JobCategories,
    },
    visa: {
        type: Boolean
    },
    applyOn: {
        type: String
    },
    paymentIntent: {
        type: String
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'Application',
    }],
    customLogo: String,
    questions: [String],
    postedOn: Date,
    disabled: {
        type: Boolean,
        default: false
    }
})


export type JobDocument = Job & Document;

JobSchema.pre('save', function (next) {
    const job = this as JobDocument;

    if (!job.isModified('description')) return next();

    job.description = xss(job.description);
    next();
})

UserSchema.methods.toJSON = function () {
    const obj: JobDocument = this.toObject();
    delete obj.paymentIntent;
    return obj;
}

export default model<JobDocument>("Job", JobSchema);