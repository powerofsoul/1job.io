
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
const path = require('path');

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

(async () => {
    try {
        connect(
            config.mongo_connection_url,
            { useNewUrlParser: true }
        );

        const server = express();
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

        server.use('/api', router);
        // server.use('/uploads', express.static(path.join(__dirname, "../uploads")))
        
        // server.get('/out/bundle.js', function (req, res) {
        //     res.sendFile(path.resolve(__dirname, '../public/out/bundle.js'));
        // });
        // server.get('*', function (req, res) {
        //     res.sendFile(path.resolve(__dirname, '../public/index.html'));
        // });


        server.listen(config.port, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${config.port} - env ${config.env}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();