import { model, Schema } from 'mongoose';
import { Product } from './product.interface';

const ProductModelSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model<Product>('Product', ProductModelSchema);
