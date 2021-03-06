import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../server/config";
import { User } from "../User";
import { EmployerDocument } from "./EmployerModel";
const md5 = require("md5");

export const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    newEmail: {
        type: String, 
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    avatar: String,
    activated: {
        type: Boolean,
        default: false
    },
    activationString: {
        type: String, 
    },
    forgotPasswordString: {
        type: String
    },
    newEmailString: {
        type: String
    },
    isAdmin: Boolean
})

export type UserDocument = User & Document;

UserSchema.methods.comparePassword = function (candidatePassword) {
    const {password} = this as any;
    return bcrypt.compare(candidatePassword, password)
};

UserSchema.methods.generateForgotPass = function () {
    const user = this as any;
    const hashDate = md5(user.companyName+new Date().getTime());

    user.forgotPasswordString = hashDate;
    this.save();
};


UserSchema.pre('save', function (next) {
    const user = this as UserDocument;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(config.salt_rounds, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
})


UserSchema.pre('save', function (next) {
    const user = this as UserDocument;

    if (user.activationString) return next();
    
    user.activationString = md5(user.email + new Date().getTime());
    next();
})

UserSchema.pre('save', function (next) {
    const user = this as UserDocument;

    if (user.activationString) return next();
    
    user.activationString = md5(user.email + new Date().getTime());
    next();
})

UserSchema.pre('save', function (next) {
    const user = this as UserDocument;

    if (!user.isModified('isAdmin')) return next();
    user.isAdmin = false;

    next();
})

UserSchema.methods.toJSON = function() {
    const obj = this.toObject() as User;
    delete obj.password;
    delete obj.activationString;
    delete obj.forgotPasswordString;
    delete obj.newEmailString;
    if(!obj.isAdmin){
        delete obj.isAdmin;
    }
    return obj;
}

export default model<UserDocument>("User", UserSchema);
 