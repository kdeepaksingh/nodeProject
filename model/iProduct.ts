import mongoose, { Document } from "mongoose";

export interface iProduct extends Document {
    _id?: string;
    name: string;
    image: string;
    price: number;
    qty: string;
    info: string;
    createdAt?: string;
    updatedAt?: string;
}