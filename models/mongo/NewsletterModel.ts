import { Document, model, Schema } from "mongoose";
import { Application } from "../Application";
import JobModel from "./JobModel";
import EmployeeModel from "./EmployeeModel";
import { Newsletter } from "../Newsletter";

export const NewsletterSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    linkedinUrl: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    }
})


export type NewsletterDcoument = Newsletter & Document;

export default model<NewsletterDcoument>("Newsletter", NewsletterSchema);