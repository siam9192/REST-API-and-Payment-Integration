import { z } from 'zod';

export const initOrderSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),

  quantity: z
    .number()
    .int('Quantity must be an integer')
    .positive('Quantity must be greater than 0'),

  deliveryAddress: z
    .string()
    .min(10, 'Delivery address must be at least 10 characters'),
});

const orderValidations = {
  initOrderSchema,
};

export default orderValidations;
