export interface Newsletter {
    _id: string;
    email: string;
    linkedinUrl: string;
    approved?: boolean;

    country: string;
    role: string;
}