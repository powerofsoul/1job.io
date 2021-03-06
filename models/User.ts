export interface User {
    _id?: string;
    email: string;
    newEmail: string;
    avatar: string;
    password: string;
    activated: boolean;
    activationString?: string;
    forgotPasswordString?: string;
    newEmailString: string;
    comparePassword?: (password: string) => Promise<boolean>
    generateForgotPass?: () => void;
    isAdmin: boolean;

    __t: typeof UserType[number]
}

export const UserType = [
    "Employer",
    "Employee"
] as const;