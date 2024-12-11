import { Router } from 'express';
import { getCurrentUserHandler, getSuggestedUsersHandler, getUserProfileHandler, getUsersHandler } from '../controllers/user.controller';
import { protect } from '../middlewares/protect';

const userRoutes = Router();

userRoutes.get('/me', protect, getCurrentUserHandler);
userRoutes.get('/suggested', protect, getSuggestedUsersHandler);
userRoutes.get('/:id', protect, getUserProfileHandler);
userRoutes.get('/', protect, getUsersHandler);

userRoutes.post('/follow', protect);
userRoutes.delete('/unfollow', protect);
userRoutes.put('/:id', protect);

export default userRoutes;
