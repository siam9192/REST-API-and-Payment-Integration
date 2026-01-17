import { startSession } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from '../../utils/http-status';
import { AuthUser } from '../auth/auth.interface';
import { ProductModel } from '../product/product.model';
import { InitOrderPayload, OrderStatus } from './order.interface';
import orderValidations from './order.validation';
import { OrderModel } from './order.model';
import { objectId } from '../../helpers/utils.helper';
import { PaymentModel } from '../payment/payment.model';
import { createStripeCheckoutSession } from '../../utils/stripe';
import { PaginationOptions } from '../../types';
import { calculatePagination } from '../../helpers/pagination.helper';

class OrderService {
  async initOrder(authUser: AuthUser, payload: InitOrderPayload) {
    payload = orderValidations.initOrderSchema.parse(payload);

    const product = await ProductModel.findById(payload.productId);

    // Check product existence
    if (!product) throw new AppError(httpStatus.NOT_FOUND, 'Product not found');

    //  Calculate total price
    const totalPrice = parseFloat(
      (payload.quantity * product.price).toFixed(2),
    );

    const transactionId = Date.now().toString();

    const session = await startSession();
    session.startTransaction();

    try {
      // Create order with transaction session
      const [createdOrder] = await OrderModel.create(
        [
          {
            productInfo: {
              id: product._id,
              name: product.name,
              price: product.price,
              quantity: payload.quantity,
            },

            subtotal: totalPrice,
            deliveryAddress: payload.deliveryAddress,
            userId: objectId(authUser.id),
            status: OrderStatus.PENDING,
          },
        ],
        { session },
      );

      const [createdPayment] = await PaymentModel.create([
        {
          transactionId,
          userId: createdOrder.userId,
          orderId: createdOrder._id,
          amount: createdOrder.subtotal,
        },
      ]);

      // Create stripe payment
      const { sessionUrl } = await createStripeCheckoutSession({
        currency: 'USD',
        productsData: [
          {
            product_name: product.name,
            images: [product.imageUrl],
            price: createdPayment.amount,
            quantity: 1,
          },
        ],
        transactionId,
        metadata: {
          paymentId: createdPayment.orderId.toString(),
          orderId: createdOrder._id.toString(),
        },
        cancelUrl: 'http://localhost:3000/suceess',
        successUrl: 'http://localhost:3000/cancel',
      });

      await session.commitTransaction();

      return { paymentSessionUrl: sessionUrl };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async getCurrentUserOrders(
    authUser: AuthUser,
    paginationOptions: PaginationOptions,
  ) {
    // Calculate pagination data
    const { page, limit, skip, sortBy, sortOrder } =
      calculatePagination(paginationOptions);

    const whereConditions = { userId: objectId(authUser.id) };
    // Fetch orders
    const payments = await OrderModel.find(whereConditions)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    const total = await OrderModel.countDocuments(whereConditions);
    const meta = {
      page,
      limit,
      total,
    };

    return {
      data: payments,
      meta,
    };
  }
  async getOrders(paginationOptions: PaginationOptions) {
    // Calculate pagination data
    const { page, limit, skip, sortBy, sortOrder } =
      calculatePagination(paginationOptions);

    // Fetch orders
    const payments = await OrderModel.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    const total = await OrderModel.countDocuments();
    const meta = {
      page,
      limit,
      total,
    };

    return {
      data: payments,
      meta,
    };
  }
}

export default new OrderService();
