import { Router } from 'express';
import { createNewUser, logout, signin } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', createNewUser);
authRoutes.post('/login', signin);
authRoutes.post('/logout', logout);

export default authRoutes;
