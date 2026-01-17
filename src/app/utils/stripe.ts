import envConfig from '../config/env.config';
import { StripeSessionPayload } from '../types';
const stripe = require('stripe')(envConfig.stripe_secret);

export const createStripeCheckoutSession = async (
  data: StripeSessionPayload,
) => {
  const payload = {
    line_items: data.productsData.map((product) => ({
      price_data: {
        currency: data.currency,
        product_data: {
          name: product.product_name,
          images: product.images,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    })),
    ...(data.metadata
      ? {
          metadata: data.metadata,
        }
      : {}),
    mode: 'payment',
    success_url: data.successUrl,
    cancel_url: data.cancelUrl,
  };

  const session = await stripe.checkout.sessions.create(payload);

  return { sessionUrl: session.url };
};
