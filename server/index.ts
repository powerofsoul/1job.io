
import express, { Request, Response } from "express";
import next from "next";
import router from "./createRoutes";
import passport from "passport";
import { Strategy } from "passport-local";
import config from "./config";
import { connect } from "mongoose";
import UserModel, { User } from "../models/UserModel";
const bodyParser = require('body-parser');
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
        UserModel.findOne({ email }, async (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            const isValidPassword = await user.comparePassword(password);
            if (!isValidPassword) { return done(null, false); }
            return done(null, user);
        });
    }
));

const dev = config.env !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
    try {
        await app.prepare();
        connect(
            config.mongo_connection_url,
            { useNewUrlParser: true }
        );

        const server = express();
        server.use(bodyParser.json());
        server.use(cookieSession({
            name: "jobs-remotely",
            keys: config.session_keys
        })); 
        server.use(passport.initialize());
        server.use(passport.session());  

        server.use('/api', router);
        server.all("*", (req: Request, res: Response) => {
            return handle(req, res);
        });

        server.listen(config.port, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${config.port} - env ${config.env}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();