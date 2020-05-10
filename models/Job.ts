import { Employer } from "./Employer";
import { Application } from "./Application";

export interface Job {
    _id?: string;
    title: string,
    company: Employer,
    description: string,
    type: typeof JobTypes[number]
    experienceLevel: (typeof JobExeperienceLevels[number])[]
    category: typeof JobCategories[number],
    regions: (typeof JobRegions[number])[]
    applyOn?: string,
    postedOn: Date,
    paymentIntent: string,
    visa: boolean | undefined,
    questions: string[],
    applications?: Application[]
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
    "Other"
] as const;
export type JobCategoriesType = typeof JobCategories[number];

export const JobExeperienceLevels = [
    "Entry",
    "Mid",
    "Senior",
    "Lead"
] as const;
export type JobExeperienceLevelsType = typeof JobExeperienceLevels[number];

export const JobRegions = [
    "ANYWHERE",
    "USA",
    "EUROPE",
    "AMERICAS",
    "CANADA",
    "EMEA",
    "ASIA",
    "AFRICA",
    "OTHER"
]

export const JobTypes = [
    "Full Time", "Part Time", "Contract"
] as const;

export type JobRegionsType = typeof JobRegions[number];