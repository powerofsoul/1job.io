import { Schema, model, Document } from "mongoose";

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

export interface User extends Document {
    email: String;
    password: String;
}

 
export default model<User>("User", UserSchema);