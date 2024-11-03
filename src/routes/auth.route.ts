import { Router } from 'express';
import { createNewUser, logoutUser, signin } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/new', createNewUser);
authRoutes.post('/signin', signin);
authRoutes.post('/logout', logoutUser);

export default authRoutes;
