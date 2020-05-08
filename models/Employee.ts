import { User } from "./User";

export interface Employee extends User {
    firstName: string,
    lastName: string,

    __t: "Employee"
}