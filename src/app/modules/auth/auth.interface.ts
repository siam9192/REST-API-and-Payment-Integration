import { CreateUserPayload } from "../user/user.interface";

export interface UserRegistrationPayload {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type RegisterPayload  = CreateUserPayload

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface AuthUser {
  id:string
}
