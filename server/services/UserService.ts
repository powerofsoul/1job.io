import { User } from "../../models/User";
import EmployerModel from "../../models/mongo/EmployerModel";
import MailService from "./MailService";
import config from "../config";
import { WelcomeTemplate, ChangeMailTemplate } from "../mail/Template";
import { ApiResponse } from "../../models/ApiResponse";
import { Employer } from "../../models/Employer";
const md5 = require("md5");

export function createUser(user: User): Promise<ApiResponse & { user?: User }> {
    return new Promise((resolve) => {
        EmployerModel.create(user).then((u) => {
            const template = WelcomeTemplate({
                companyName: u?.companyName,
                activationString: u.activationString,
                domain: config.hostname
            });
            MailService.notify(user.email, "Welcome!", template);
            resolve({
                success: true,
                message: "Please check your email for the activation link.",
                user: u
            })
        }).catch((err) => {
            let message = "Something went wrong. Please contact the administrator!";

            if (err.keyPattern?.email == 1 || Object.keys(err.errors).indexOf("email") >= 0) {
                message = "Email already used or incorrect.";
            }

            resolve({
                success: false,
                message
            })
        });
    })
}

export interface UpdateUserResponse extends ApiResponse {
    user?: Employer;
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

    return updateUser(currentUser._id, user, {
        ...options,
        notifyNewEmail
    });
}

export function updateUser(_id: string, newUser: Partial<Employer>, options: UpdateUserOption = {}): Promise<UpdateUserResponse> {
    return new Promise((resolve) => {
        EmployerModel.findOneAndUpdate({ _id: _id }, newUser, { new: options.returnNewUser }, (err, user) => {
            if (err) {
                resolve({
                    success: false,
                    message: "Something went wrong"
                });
            } else {
                resolve({
                    success: true,
                    user: user
                })

                if (options.notifyNewEmail) {
                    const changeMailTemplate = ChangeMailTemplate({
                        hash: user.newEmailString,
                        name: user.companyName,
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