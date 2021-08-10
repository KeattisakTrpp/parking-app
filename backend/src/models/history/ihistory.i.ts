import { Document } from "mongoose";

export interface IHistory extends Document {
    autonum: String
    start: String
    stop: String
    plate: String
    status:  String
}
