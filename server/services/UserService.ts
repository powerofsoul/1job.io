import { User, UserType } from "../../models/User";
import EmployerModel, { EmployerDocument } from "../../models/mongo/EmployerModel";
import MailService from "./MailService";
import config from "../config";
import { WelcomeTemplate, ChangeMailTemplate } from "../mail/Template";
import { ApiResponse } from "../../models/ApiResponse";
import { Employer } from "../../models/Employer";
import EmployeeModel, { EmployeeDocument } from "../../models/mongo/EmployeeModel";
import { Employee } from "../../models/Employee";
import UserModel, { UserDocument } from "../../models/mongo/UserModel";
const md5 = require("md5");

export function createUser(user: User): Promise<ApiResponse & { user?: User }> {
    return new Promise((resolve) => {
        if (!user.__t || !UserType.includes(user.__t)) {
            resolve({
                success: false,
                message: "Invalid user type"
            })
            return;
        }

        const model = user.__t == "Employer" ? EmployerModel : EmployeeModel;

        model.create(user, (err, u: Employee | Employer) => {
            if (err) {

                let message = "Something went wrong. Please contact the administrator!";

                if (err.keyPattern?.email == 1 || Object.keys(err.errors).indexOf("email") >= 0) {
                    message = "Email already used or incorrect.";
                }

                resolve({
                    success: false,
                    message
                })
            } else {
                const template = WelcomeTemplate({
                    name: u.__t == "Employer" ? u.companyName : u.firstName,
                    activationString: u.activationString,
                    domain: config.hostname
                });

                MailService.notify(user.email, "Welcome!", template);
                resolve({
                    success: true,
                    message: "Please check your email for the activation link.",
                    user: u
                })
            }
        })
    });
}

export interface UpdateUserResponse extends ApiResponse {
    user?: EmployerDocument | EmployeeDocument | UserDocument;
}

export interface UpdateUserOption {
    returnNewUser?: boolean
    notifyNewEmail?: boolean;
}

export function updateCurrentUser(user: Partial<Employer>,
    currentUser: Employer,
    options: UpdateUserOption = { returnNewUser: true }): Promise<UpdateUserResponse> {

    delete user.password;

    let notifyNewEmail = false;
    if (user.email && user.email != currentUser.email) {
        user.newEmail = user.email;
        user.email = currentUser.email;
        user.newEmailString = md5(user.email + new Date().getTime());
        notifyNewEmail = true;
    }

    const model = currentUser.__t == "Employer" ? EmployerModel : EmployeeModel;

    return updateUser(model, currentUser._id, user, {
        ...options,
        notifyNewEmail
    });
}

type UserModelType = typeof EmployerModel | typeof EmployeeModel | typeof UserModel

export function updateUser(model: UserModelType, _id: string, newUser: Partial<Employer | Employee>, options: UpdateUserOption = {}): Promise<UpdateUserResponse> {
    return new Promise((resolve) => {
        model.findOneAndUpdate({ _id: _id }, newUser, { new: options.returnNewUser }, (err, user) => {
            if (err) {
                resolve({
                    success: false,
                    message: "Something went wrong"
                });
            } else {
                resolve({
                    success: true,
                    user
                })

                if (options.notifyNewEmail) {
                    const changeMailTemplate = ChangeMailTemplate({
                        hash: user.newEmailString,
                        name: user.__t == "Employer" ? (user as EmployerDocument).companyName : (user as EmployeeDocument).lastName,
                        newEmail: user.newEmail
                    });

                    MailService.notify(user.email, "Email change request.", changeMailTemplate);
                }
            }
        })
    });
}


export const UserService = {
    createUser, updateCurrentUser, updateUser
}