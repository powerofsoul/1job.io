import { Employee } from "../../../models/Employee";
import moment from "moment";
import e from "express";

export function normalizeEmployee(user: Employee): Employee {
    return {
        ...user,
        workExperience: user.workExperience.map((ex) => ({
            ...ex,
            period: ex.period.map((d) => moment(d as string))
        })),
        education: user.education.map((e) => ({
            ...e,
            period: e.period.map((p) => moment(p as string))
        })),
        projects: user.projects.map((e) => ({
            ...e,
            period: e.period.map((p) => moment(p as string))
        }))
    } as Employee;
}