import { Schema, model, Document } from "mongoose";
import { Employer } from "../Employer";
const xss = require("xss");

export const EmployerSchema  = new Schema({
    companyName: {
        type: String, 
        required: true
    },
    companySize: {
        type: Number,
        min: 1,
        default: 1
    },
    companyWebsite: {
        type: String
    },
    companyDescription: {
        type: String
    }
})

export type EmployerDocument = Employer & Document;

EmployerSchema.pre('save', function (next) {
    const user: EmployerDocument = this as EmployerDocument;

    if (!user.isModified('companyDescription')) return next();
    
    user.companyDescription = xss(user.companyDescription);
    next();
})

export default model<EmployerDocument>("Employer", EmployerSchema);