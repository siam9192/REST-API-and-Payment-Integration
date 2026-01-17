import { z } from 'zod';
import { Gender } from './user.interface';

export const createUserSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  gender: z.nativeEnum(Gender),

  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be at most 32 characters'),
});

const userValidations = {
  createUserSchema,
};

export default userValidations;
