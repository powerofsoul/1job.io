
import express, { Request, Response } from "express";
import router from "./createRoutes";
import passport from "passport";
import { Strategy } from "passport-local";
import config from "./config";
import { connect } from "mongoose";
import UserModel from "../models/mongo/UserModel";
import { User } from "../models/User";
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const fileUpload = require("express-fileupload");
var cors = require('cors');

passport.serializeUser(function (user: User, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new Strategy(
    { usernameField: "email", passwordField: "password" },
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


connect(
    config.mongo_connection_url,
    { useNewUrlParser: true }
);

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


server.use(cookieSession({
    name: "jobs-remotely",
    keys: config.session_keys
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(fileUpload({
    limits: {
        fileSize: 2 * 1024 * 1024
    }
}))

server.get("/", (req, res) => res.send("Alive"));
server.use('/', router);
server.listen(config.port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on localhost:${config.port} - env ${config.env}`);
});
