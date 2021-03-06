import { Schema, model, Document } from "mongoose";
import { Employer } from "../Employer";
import UserModel from "./UserModel";
import { User } from "../User";
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

export type EmployerDocument = User & Employer & Document;

EmployerSchema.pre('save', function (next) {
    const user: EmployerDocument = this as EmployerDocument;

    if (!user.isModified('companyDescription')) return next();
    
    user.companyDescription = xss(user.companyDescription);
    next();
})

EmployerSchema.methods.toJSON = function() {
    const obj = this.toObject() as Employer;
    delete obj.password;
    delete obj.activationString;
    delete obj.forgotPasswordString;
    delete obj.newEmailString;
    if(!obj.isAdmin){
        delete obj.isAdmin;
    }
    return obj;
}


export default UserModel.discriminator<EmployerDocument>("Employer", EmployerSchema);