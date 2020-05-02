import { Schema, model, Document } from "mongoose";
import { Job, JobExeperienceLevels, JobCategories, JobRegions, JobTypes } from "../Job";
import { UserSchema } from "./UserModel";

export const JobSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    company: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: JobTypes,
        required: true
    },
    experienceLevel: {
        type: [String],
        enum: JobExeperienceLevels,
        required: true
    },
    regions: {
        type: [String],
        enum: JobRegions,
        required: true
    },
    category: {
        type: String,
        enum: JobCategories,
        required: true
    },
    visa: {
        type: Boolean
    },
    postedOn: Date,
})

type JobDocument = Job & Document;

export default model<JobDocument>("Job", JobSchema);