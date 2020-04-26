export interface Job {
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