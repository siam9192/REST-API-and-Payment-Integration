import { Router } from 'express';
import userController from './user.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', userController.getUsers);
router.get('/me', auth(), userController.getCurrentUser);

const userRouter = router;

export default userRouter;
