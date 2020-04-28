import { RequestHandler } from "express";

export const isAuthenticated: RequestHandler = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }

    res.status(401).send("Unauthenticated");
}