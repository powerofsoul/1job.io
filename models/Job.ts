import { User } from "./User";

export interface Job {
    _id: string;
    title: string,
    loading: boolean,
    company: User,
    description: string,
    experienceLevel: (typeof JobExeperienceLevels[number])[]
    category: typeof JobCategories[number],
    regions: (typeof JobRegions[number])[]
    postedOn: Date,
    visa: boolean | undefined
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
    "Full Remote",
    "Usa",
    "Europe",
    "Americas",
    "Canada",
    "EMEA",
    "Asia",
    "Africa",
    "Other"
]
export type JobRegionsType = typeof JobRegions[number];
