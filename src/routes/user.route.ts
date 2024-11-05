import { Router } from 'express';
import { getUserByIdHandler, getUsersHandler } from '../controllers/user.controller';
import { protect } from '../services/auth.service';

const userRoutes = Router();

userRoutes.get('/', protect, getUsersHandler);
userRoutes.get('/:id', getUserByIdHandler);

export default userRoutes;
