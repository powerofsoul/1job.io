export interface User {
    _id?: string;
    email: string;
    password: string;
    companyName: string;
    companySize: number;
    companyImage: string;
    companyWebsite: string;
    companyDescription: string;
    activated: boolean;
    activationString?: string;
    comparePassword?: (password: string) => Promise<boolean>
}
