import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    userEmail: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    plz: { type: String },
    country: { type: String },
    cartProducts: { type: Object },
    paid: { type: Boolean, default: false },

}, { timestamps: true });

export const Order = models?.Order || model('Order', OrderSchema)