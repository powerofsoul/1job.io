import { User } from "./User";

export interface Job {
    _id: string;
    title: string,
    loading: boolean,
    company: User,
    description: string,
    experienceLevel: (typeof JobExeperienceLevels[number])[]
    category: (typeof JobExeperienceLevels[number])[]
    postedOn: Date
}

export const JobCategories = [
    "Programming",
    "Design",
    "Copywriting",
    "DevOps & Sysadmin",
    "Business & Management",
    "Product",
    "Customer Support",
    "Finance and Legal",
    "Sales and Marketing",
    "Full-Time",
    "Contract",
    "Other"
] as const;

export const JobExeperienceLevels = [
    "Entry",
    "Mid",
    "Senior",
    "Lead"
] as const;