import { Schema, model, Document } from "mongoose";
import { Employer } from "../Employer";
import UserModel from "./UserModel";
import { User } from "../User";
import { Employee } from "../Employee";

export const EmployeeSchema  = new Schema({
    firstName: String,
    lastName: String,
})

export type EmployeeDocument = User & Employee & Document;

export default UserModel.discriminator<EmployeeDocument>("Employee", EmployeeSchema);