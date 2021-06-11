import mongoose, { Schema } from "mongoose";
import { IParking } from "./iparking.i";

const parkingSchema: Schema = new Schema({
  date: { type: Date, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  status: {type: String, enum: ['active', 'reserved', 'inactive'] },
  userId: { type: Schema.Types.ObjectId , ref: 'User' , required: true }
}, {
  timestamps: true,
});

export const Parking = mongoose.model<IParking>('Parking', parkingSchema);
