import { Router } from 'express';
import { createNewUser, signin } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/new', createNewUser);
authRoutes.post('/signin', signin);

export default authRoutes;
