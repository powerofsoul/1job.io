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
    education: [],
    skills: [String],
    languages: [String],
    interests: [String],
    projects: []
})

export type EmployeeDocument = User & Employee & Document;

export default UserModel.discriminator<EmployeeDocument>("Employee", EmployeeSchema);