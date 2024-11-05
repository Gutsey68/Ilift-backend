import { Router } from 'express';
import { createNewUser, signin } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', createNewUser);
authRoutes.post('/login', signin);

export default authRoutes;
