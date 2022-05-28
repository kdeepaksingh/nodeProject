import mongoose, { Schema, Model } from "mongoose";
import { iProduct } from "../model/iProduct";

let productSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    qty: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
}, { timestamps: true });

let productModel: Model<iProduct> = mongoose.model('Product', productSchema);

export default productModel;