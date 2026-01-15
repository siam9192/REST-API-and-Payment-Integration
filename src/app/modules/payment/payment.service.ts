import envConfig from '../../config/env.config';
import AppError from '../../errors/AppError';
import { calculatePagination } from '../../helpers/pagination.helper';
import { PaginationOptions } from '../../types';
import httpStatus from '../../utils/http-status';
import { PaymentModel } from './payment.model';
const stripe = require('stripe')(envConfig.stripe_secret);

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


  async webhook (body:any,headers:any){
    const endpointSecret = "7287722"
     let event = body;
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        endpointSecret
      );
    } catch (err) { 
      throw new AppError(httpStatus.BAD_REQUEST,"Verification failed")
    }
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
          
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  
  }
}

export default new PaymentService();
