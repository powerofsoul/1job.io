import { Schema, model, Document } from "mongoose";
import { Employer } from "../Employer";
import UserModel from "./UserModel";
import { User } from "../User";
import { Employee } from "../Employee";
import { UserSchema } from "./UserModel";

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
    }],
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'Application',
    }],
})

EmployeeSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj.activationString;
    delete obj.forgotPasswordString;
    delete obj.newEmailString;
    return obj;
}

export type EmployeeDocument = User & Employee & Document;

export default UserModel.discriminator<EmployeeDocument>("Employee", EmployeeSchema);