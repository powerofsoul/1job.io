
export interface Job {
    _id: string;
    loading: boolean;
    title: string;
    company: string;
    companyImage: string;
    featured: boolean;
    postedOn: Date;
    description: string;
    tags: string[];
    likes: number;
    liked: boolean;
    location: string;
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
    "Mind",
    "Senior",
    "Lead"
] as const;