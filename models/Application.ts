import { Employee } from "./Employee";
import { Job } from "./Job";

export interface Application {
    job?: Job | string;
    employee?: Employee | string;
    coverLetter: string;
    answers: {
        question: string,
        answer: string;
    }[]
}