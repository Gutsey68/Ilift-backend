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
import { validate } from '../middlewares/validate';
import { updateUserSchema } from '../validators/users.validation';

const userRoutes = Router();

userRoutes.use(protect);

userRoutes.get('/me', getCurrentUserHandler);
userRoutes.get('/suggested', getSuggestedUsersHandler);
userRoutes.get('/:id', getUserProfileHandler);
userRoutes.get('/', getUsersHandler);
userRoutes.post('/follow/:id', followHandler);
userRoutes.delete('/unfollow/:id', unfollowHandler);
userRoutes.put('/:id', upload.single('profilePhoto'), validate(updateUserSchema), updateUserHandler);

export default userRoutes;
