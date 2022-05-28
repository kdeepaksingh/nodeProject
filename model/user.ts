import mongoose, { Schema, Model } from "mongoose";
import { eventUser } from "./eventUser";

let userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

let User: Model<eventUser> = mongoose.model('User', userSchema);

export default User;