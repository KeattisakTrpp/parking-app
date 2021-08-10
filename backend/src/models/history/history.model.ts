import mongoose, { Schema } from "mongoose";
import { IHistory } from "./ihistory.i";

const historySchema: Schema = new Schema({
  autonum: { type: String },
  num: { type: String, default: "0" },
  start: { type: String },
  stop: { type: String },
  plate: { type: String },
  status: { type: String },
}, {
  timestamps: true,
});

export const History = mongoose.model<IHistory>('history', historySchema, 'history');
