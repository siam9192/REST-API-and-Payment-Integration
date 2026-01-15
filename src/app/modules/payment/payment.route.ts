import { Router } from 'express';
import paymentController from './payment.controller';

const router = Router();

router.get('/', paymentController.getPayments);

const paymentRouter = router;

export default paymentRouter;
