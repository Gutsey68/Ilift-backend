import { Router } from 'express';
import {
  followHandler,
  getCurrentUserHandler,
  getSuggestedUsersHandler,
  getUserProfileHandler,
  getUsersHandler,
  unfollowHandler,
  updateUserHandler
} from '../controllers/users.controller';
import { protect } from '../middlewares/protect';

const userRoutes = Router();

userRoutes.get('/me', protect, getCurrentUserHandler);
userRoutes.get('/suggested', protect, getSuggestedUsersHandler);
userRoutes.get('/:id', protect, getUserProfileHandler);
userRoutes.get('/', protect, getUsersHandler);

userRoutes.post('/follow', protect, followHandler);
userRoutes.delete('/unfollow', protect, unfollowHandler);
userRoutes.put('/:id', protect, updateUserHandler);

export default userRoutes;
