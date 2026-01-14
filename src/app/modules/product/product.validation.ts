import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, 'Product name must be at least 2 characters')
    .max(100, 'Product name must not exceed 100 characters'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),

  imageUrl: z.string().url('Invalid image URL'),

  price: z.number().positive('Price must be greater than 0'),
});

const productValidations = {
  createProductSchema,
};

export default productValidations;
