import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "../server/config";

export const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.methods.comparePassword = function (candidatePassword) {
    const {password} = this;
    return bcrypt.compare(candidatePassword, password)
};


UserSchema.pre('save', function (next) {
    const user = this as User;

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

const UserModel = model<User>("User", UserSchema);

export interface User extends Document {
    email: String;
    password: String;
    comparePassword: (password: string) => Promise<boolean>
}

export default UserModel;