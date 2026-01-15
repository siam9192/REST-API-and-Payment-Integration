import { model, Schema } from 'mongoose';
import { Order, OrderStatus } from './order.interface';

const OrderModelSchema = new Schema<Order>(
  {
    productInfo: {
      type: {
        id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },

    paymentId: {
      type: Schema.Types.ObjectId,
      required: false,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<Order>('Order', OrderModelSchema);
