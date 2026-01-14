import { Document } from 'mongoose';
import z from 'zod';
import productValidations from './product.validation';

export interface Product extends Document {
  name: string;
  description: string;
  imageUrl: string;
  price: number;

  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductPayload = z.infer<
  typeof productValidations.createProductSchema
>;
