import { Router } from 'express';
import { getCurrentUserHandler, getSuggestedUsersHandler, getUserProfileHandler, getUsersHandler } from '../controllers/user.controller';
import { protect } from '../middlewares/protect';

const userRoutes = Router();

userRoutes.get('/me', protect, getCurrentUserHandler);
userRoutes.get('/:id', protect, getUserProfileHandler);
userRoutes.get('/', protect, getUsersHandler);
userRoutes.get('/:id/suggested', protect, getSuggestedUsersHandler);

export default userRoutes;
