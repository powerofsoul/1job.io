import { User } from "../../models/User";
import EmployerModel from "../../models/mongo/EmployerModel";
import MailService from "./MailService";
import config from "../config";
import { WelcomeTemplate } from "../mail/Template";
import { ApiResponse } from "../../models/ApiResponse";

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


export const UserService = {
    createUser
}