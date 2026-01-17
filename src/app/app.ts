import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './utils/routes';
import cookieParser from 'cookie-parser';
import { GlobalErrorHandler } from './errors/globalErrorHandler';
import envConfig from './config/env.config';
import paymentController from './modules/payment/payment.controller';

const app = express();
app.use(cors())
app.use(
  cors({ origin: [envConfig.url.client_origin as string], credentials: true }),
);

app.use(cookieParser());

//  Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' });
});

// Payment success route
app.get('/success', async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    title: 'Payment Successful!',
    message: `Thank you for your purchase! Your payment has been processed successfully.We are currently preparing your items for shipment. You will receive a confirmation email shortly with your tracking details and a digital receipt of this transaction`,
  });
});

// Payment cancel route
app.get('/cancel', (req: Request, res: Response) => {
  res.status(200).json({
    success: false,
    title: 'Payment Cancelled or Failed',
    message: `It looks like your payment session was interrupted or declined.Don't worry—no funds were deducted from your account. This could be due to an incorrect card detail, an expired session, or manual cancellation.If you experienced a technical issue, please try checking out again or contact our support team for assistance.`
  });
});


app.post(
  '/api/v1/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.webhook,
);

app.use('/api/v1', express.json(), routes);

// Route not found Handler
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, statusCode: 404, message: 'Route not found' });
});

// Global Error Handler
app.use(GlobalErrorHandler);

export default app;
