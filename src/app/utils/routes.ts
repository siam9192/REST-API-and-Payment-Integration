import { IRouter, Router } from 'express';
import userRouter from '../modules/user/user.route';
import authRouter from '../modules/auth/auth.router';
import productRouter from '../modules/product/product.router';
import orderRouter from '../modules/order/order.route';
import paymentRouter from '../modules/payment/payment.route';

type TModuleRoutes = { path: string; router: IRouter }[];
const router = Router();
const moduleRoutes: TModuleRoutes = [
  { path: '/auth', router: authRouter },
  { path: '/users', router: userRouter },
  { path: '/products', router: productRouter },
  { path: '/orders', router: orderRouter },
  { path: '/payments', router: paymentRouter },
];

const routes = moduleRoutes.map((route) =>
  router.use(route.path, route.router),
);

export default routes;
