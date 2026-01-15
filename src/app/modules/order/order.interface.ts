import { Document, Types } from 'mongoose';
import orderValidations from './order.validation';
import z from 'zod';

export interface Order extends Document {
  productInfo: OrderProductInfo;

  subtotal: number;
  deliveryAddress: string;
  status: OrderStatus;
  paymentId?: Types.ObjectId;

  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

type OrderProductInfo = {
  id: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
};

export enum OrderStatus {
  PENDING = 'pending',
  PLACED = 'placed',
  FAILED = 'failed',
}

export type InitOrderPayload = z.infer<typeof orderValidations.initOrderSchema>;
