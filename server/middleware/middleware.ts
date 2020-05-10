import { RequestHandler } from "express";

export const isAuthenticated: RequestHandler = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(401).send("Unauthenticated");
    }
}

export const isEmployee: RequestHandler = (req, res, next) => {
    if(req.isAuthenticated() && req.user.__t == "Employee"){
        next();
    } else{
        res.status(401).send("Unauthenticated");
    }
}

export const isEmployer: RequestHandler = (req, res, next) => {
    if(req.isAuthenticated() && req.user.__t == "Employer"){
        next();
    } else{
        res.status(401).send("Unauthenticated");
    }
}