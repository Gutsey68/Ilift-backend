import { Router } from 'express';
import { getUserProfileHandler, getUsersHandler } from '../controllers/user.controller';
import { protect } from '../middlewares/protect';

const userRoutes = Router();

userRoutes.get('/', protect, getUsersHandler);
userRoutes.get('/me', protect, getUserProfileHandler);

export default userRoutes;
