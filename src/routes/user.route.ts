import { Router } from 'express';
import { createNewUserHandler, getCurrentUser, getUserProfileHandler, getUsersHandler, signinHandler } from '../controllers/user.controller';
import { protect } from '../middlewares/protect';

const userRoutes = Router();

userRoutes.get('/me', protect, getCurrentUser);
userRoutes.post('/register', createNewUserHandler);
userRoutes.post('/login', signinHandler);
userRoutes.get('/:id', protect, getUserProfileHandler);
userRoutes.get('/', protect, getUsersHandler);

export default userRoutes;
