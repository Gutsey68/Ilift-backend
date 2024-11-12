import { Router } from 'express';
import { createNewUser, signin } from '../controllers/auth.controller';
import { getCurrentUser, getUserProfileHandler, getUsersHandler } from '../controllers/user.controller';
import { protect } from '../middlewares/protect';

const userRoutes = Router();

userRoutes.get('/me', protect, getCurrentUser);
userRoutes.post('/register', createNewUser);
userRoutes.post('/login', signin);
userRoutes.get('/:id', protect, getUserProfileHandler);
userRoutes.get('/', protect, getUsersHandler);

export default userRoutes;
