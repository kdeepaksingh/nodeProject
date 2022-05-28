import mongoose, { Schema, Model } from "mongoose";
import { Iimage } from './Iimage';

let imageSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    size: {
        type: String,
        required: true,
        unique: true
    },
    key: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true });

let imageModel: Model<Iimage> = mongoose.model('UploadImage', imageSchema);

export default imageModel;