import { Document } from "mongoose";

export interface IUser extends Document {
    username: string,
    password: string,
    name: string,
    surname: string,
    email: string,
    tel: string,
    cars: Car[],
    status: UserStatus
}

interface Car {
    plate: string,
    color: string,
    brand: string
}

export enum UserStatus {
    'verified' = 'verified',
    'notVerified' = 'not verified'
}