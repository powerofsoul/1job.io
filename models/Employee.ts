import { User } from "./User";
import { Moment } from "moment";

export interface Employee extends User {
    firstName: string;
    lastName: string;
    phone: String,
    motto: String,
    workExperience: WorkExperience[],
    education: Education[],
    skills: string[],
    languages: string[],
    interests: string[],
    projects: WorkProject[];
}

type Period = String | Date | Moment;

export interface WorkExperience {
    title: string;
    companyName: string;
    period: Period[];
    location: string;
    description: string;
}

export interface WorkProject {
    name: string;
    link?: string;
    period: Period[];
    description: string;
}

export interface Education {
    study: string;
    institution: string;
    period: Period[];
    courses: string[]
}