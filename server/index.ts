
import express, { Request, Response } from "express";
import next from "next";
import router from "./createRoutes";
import passport from "passport";
import { Strategy } from "passport-local";
const cookieSession = require('cookie-session')

passport.serializeUser(function(user: User, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new Strategy(
    {usernameField: "email", passwordField: "password"},
    function (email: string, password: string, done) {
        UserModel.findOne({ email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password != password) { return done(null, false); }
            return done(null, user);
        });
    }
));

const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
import { connect } from "mongoose";
import UserModel, { User } from "../models/UserModel";

const mongoConnectionUrl = process.env.MONGO_URL || "mongodb://localhost:27017/jobsremotely";
const sessionKeys = process.env.KEEYS || ["local", "local2"];

(async () => {
    try {
        await app.prepare();
        connect(
            mongoConnectionUrl,
            { useNewUrlParser: true }
        );

        const server = express();
        server.use(bodyParser.json());
        server.use(cookieSession({
            name: "jobs-remotely",
            keys: sessionKeys
        })); 
        server.use(passport.initialize());
        server.use(passport.session());  

        server.use('/api', router);
        server.all("*", (req: Request, res: Response) => {
            return handle(req, res);
        });

        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();