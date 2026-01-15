import envConfig from '../config/env.config';
import { StripeSessionPayload } from '../types';
const stripe = require('stripe')(envConfig.stripe_secret);

export const createStripeSession = async (data: StripeSessionPayload) => {
  const session = await stripe.checkout.sessions.create({
    line_items: data.productsData.map((product) => ({
      price_data: {
        currency: data.currency,
        product_data: {
          name: product.product_name,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    })),
    ...(data.metadata
      ? {
          payment_intent_data: {
            metadata: data.metadata,
          },
        }
      : {}),
    mode: 'payment',
    success_url: data.successUrl || '',
    cancel_url: data.cancelUrl || '',
  });

  return { sessionUrl: session.url };
};
