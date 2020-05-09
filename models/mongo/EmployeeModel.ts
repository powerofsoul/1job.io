import { Schema, model, Document } from "mongoose";
import { Employer } from "../Employer";
import UserModel from "./UserModel";
import { User } from "../User";
import { Employee } from "../Employee";

export const EmployeeSchema  = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    motto: String,
    workExperience: [{
        title: String,
        companyName: String,
        period: [Date],
        location: String,
        description: String,
    }],
    education: [{
        study: String,
        institution: String,
        period: [Date],
        courses: [String]
    }],
    skills: [String],
    languages: [String],
    interests: [String],
    projects: [{
        name: String,
        link: String,
        period: [Date],
        description: String
    }]
})

export type EmployeeDocument = User & Employee & Document;

export default UserModel.discriminator<EmployeeDocument>("Employee", EmployeeSchema);