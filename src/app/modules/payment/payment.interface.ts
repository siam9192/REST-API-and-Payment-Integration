import { Document, Types } from 'mongoose';

export interface Payment extends Document {
  transactionId: string;
  amount: number;
  orderId: Types.ObjectId;
  userId: Types.ObjectId;
  status: PaymentStatus;

  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}
