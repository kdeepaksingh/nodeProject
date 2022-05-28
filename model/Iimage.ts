import mongoose, { Document, Date } from "mongoose";

export interface Iimage extends Document {
    name: string
    size: number
    key: string
    url: string
    createdAt: Date
}