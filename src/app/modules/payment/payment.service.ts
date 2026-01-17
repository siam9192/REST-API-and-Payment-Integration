import Stripe from 'stripe';
import envConfig from '../../config/env.config';
import AppError from '../../errors/AppError';
import { calculatePagination } from '../../helpers/pagination.helper';
import { PaginationOptions } from '../../types';
import httpStatus from '../../utils/http-status';
import { OrderStatus } from '../order/order.interface';
import { OrderModel } from '../order/order.model';
import { PaymentStatus } from './payment.interface';
import { PaymentModel } from './payment.model';
const stripe = new Stripe(envConfig.stripe_secret as string);

class PaymentService {
  async getPayments(paginationOptions: PaginationOptions) {
    // Calculate pagination data
    const { page, limit, skip, sortBy, sortOrder } =
      calculatePagination(paginationOptions);
    const payments = await PaymentModel.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    const total = await PaymentModel.countDocuments();
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

  async webhook(body: Buffer, headers: any) {
    const signature = headers['stripe-signature'];
    let event: Stripe.Event;

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        envConfig.stripe_webhook_secret as string,
      );
    } catch (err: any) {
      console.error('Stripe webhook verification failed:', err.message);
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Webhook Error: ${err.message}`,
      );
    }

    const session = event.data.object as any;

    let metadata = session.metadata;

    if (!metadata) throw new AppError(httpStatus.BAD_REQUEST, 'Bad request');

    // Handle specific event types
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        // Ensure payment is actually successful
        if (session.payment_status === 'paid') {
          const transactionId = session.payment_intent as string;

          await PaymentModel.findByIdAndUpdate(metadata.paymentId, {
            status: PaymentStatus.SUCCESS,
            transactionId: transactionId, // Store the pi_XXX ID
          });
        }

        await OrderModel.findByIdAndUpdate(metadata.orderId, {
          status: OrderStatus.PLACED,
        });

        break;

      case 'checkout.session.expired':
        await PaymentModel.findByIdAndUpdate(metadata.paymentId, {
          status: PaymentStatus.FAILED,
        });

        await OrderModel.findByIdAndUpdate(metadata.orderId, {
          status: OrderStatus.FAILED,
        });

        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }
}

export default new PaymentService();
