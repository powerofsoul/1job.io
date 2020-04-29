import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../server/config";
import { User } from "../User";
const xss = require("xss");

export const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String, 
        required: true
    },
    companySize: {
        type: Number,
        min: 1,
        default: 1
    },
    companyWebsite: {
        type: String
    },
    companyImage: {
        type: String
    },
    companyDescription: {
        type: String
    }
})

type UserDocument = User & Document;

UserSchema.methods.comparePassword = function (candidatePassword) {
    const {password} = this;
    return bcrypt.compare(candidatePassword, password)
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

    if (!user.isModified('companyDescription')) return next();
    
    user.companyDescription = xss(user.companyDescription);
    next();
})

UserSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

export default model<UserDocument>("User", UserSchema);
 