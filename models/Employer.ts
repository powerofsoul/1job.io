import { User } from "./User";

export interface Employer extends User {
    _id: string;
    companyName: string;
    companySize: number;
    companyWebsite: string;
    companyDescription: string;
}