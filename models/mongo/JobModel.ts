import { Schema, model, Document } from "mongoose";
import { Job, JobExeperienceLevels, JobCategories } from "../Job";
import { UserSchema } from "./UserModel";

export const JobSchema = new Schema({
    title: {
        type: String,
        required: true
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
    experienceLevel: {
        type: JobExeperienceLevels,
        required: true
    },
    category: {
        type: JobCategories,
        required: true
    },
    postedOn: Date,
})

type JobDocument = Job & Document;

export default model<JobDocument>("Job", JobSchema);