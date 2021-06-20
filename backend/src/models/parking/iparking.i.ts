import { Document } from "mongoose";
import { IUser } from "../user/iuser.i";

export interface IParking extends Document {
    date: Date,
    checkIn: String,
    checkOut: String,
    status: Status,
    userId: IUser['_id']
}

export enum Status {
    'reserved' = 'reserved',
    'checkIn' = 'check in',
    'checkOut' = 'check out'
}
