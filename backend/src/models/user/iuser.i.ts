import { Document } from "mongoose";

export interface IUser extends Document {
    username: string,
    password: string,
    name: string,
    surname: string,
    email: string,
    tel: string,
    cars: Car[],
}

interface Car {
    plate: string,
    color: string,
    brand: string
}
