
export interface UserRegistrationPayload {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface AuthUser {
  id:string
}
