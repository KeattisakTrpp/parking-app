import mongoose, { Schema } from 'mongoose'
import { IUser, UserStatus } from './iuser.i';

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, 
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  },
  tel: { type: String, required: true },
  cars: [{
    plate: { type: String, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true }
  }],
  status: { type: UserStatus, default: UserStatus.notVerified }
}, {
  timestamps: true,
});

export const User = mongoose.model<IUser>('User', userSchema);
