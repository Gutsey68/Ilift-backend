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
import upload from '../middlewares/multer.config';
import { protect } from '../middlewares/protect';

const userRoutes = Router();

userRoutes.use(protect);

userRoutes.get('/me', getCurrentUserHandler);
userRoutes.get('/suggested', getSuggestedUsersHandler);
userRoutes.get('/:id', getUserProfileHandler);
userRoutes.get('/', getUsersHandler);

userRoutes.post('/follow', followHandler);
userRoutes.delete('/unfollow', unfollowHandler);
userRoutes.put('/:id', upload.single('profilePhoto'), updateUserHandler);

export default userRoutes;
