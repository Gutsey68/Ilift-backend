import { Router } from 'express';
import { getUserByIdHandler, getUsersHandler } from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.get('/', getUsersHandler);
userRoutes.get('/:id', getUserByIdHandler);

export default userRoutes;
