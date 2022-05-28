import mongoose, { Schema, Model } from "mongoose";
import { iEvents } from './iEvents';

let eventsSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
}, { timestamps: true });

let eventModel: Model<iEvents> = mongoose.model('Event', eventsSchema);

export default eventModel;