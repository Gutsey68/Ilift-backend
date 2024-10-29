import { Router } from 'express';
import { getUserById, getUsers } from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);

export default userRoutes;
