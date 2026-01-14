import { Document } from 'mongoose';

export interface User extends Document {
  fullName: string;
  gender: Gender;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export type CreateUserPayload = Pick<
  User,
  'fullName' | 'gender' | 'email' | 'password'
>;
