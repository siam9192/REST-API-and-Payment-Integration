import { Router } from 'express';
import orderController from './order.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/init', auth(), orderController.initOrder);

router.get('/', orderController.getOrders);
router.get('/me', auth(), orderController.getCurrentUserOrders);

const orderRouter = router;

export default orderRouter;
