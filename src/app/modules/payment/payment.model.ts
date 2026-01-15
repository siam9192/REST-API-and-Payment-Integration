import { model, Schema } from 'mongoose';
import { Payment, PaymentStatus } from './payment.interface';

const PaymentModelSchema = new Schema<Payment>(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PaymentModel = model<Payment>('Payment', PaymentModelSchema);
