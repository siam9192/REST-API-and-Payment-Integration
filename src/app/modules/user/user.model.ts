import { model, Schema } from 'mongoose';
import { Gender, User } from './user.interface';

const UserModelSchema = new Schema<User>(
  {
    fullName: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    email: {
      type: String,
      unique: true,
      minLength: 5,
      maxLength: 100,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<User>('User', UserModelSchema);
