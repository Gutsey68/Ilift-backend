import { Router } from 'express';
import { getCurrentUser, getUserProfileHandler, getUsersHandler } from '../controllers/user.controller';
import { protect } from '../middlewares/protect';

const userRoutes = Router();

userRoutes.get('/', protect, getUsersHandler);
userRoutes.get('/me', protect, getCurrentUser);
userRoutes.get('/:id', protect, getUserProfileHandler);

export default userRoutes;
