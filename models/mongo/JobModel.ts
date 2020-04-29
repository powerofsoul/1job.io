import { Schema, model, Document } from "mongoose";
import { Job } from "../Job";

export const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    companyImage: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    postedOn: Date,
    tags: [{
        type: String
    }],
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: Number,
        default: []
    }],
    location: String
})

type JobDocument = Job & Document;

export default model<JobDocument>("Job", JobSchema);