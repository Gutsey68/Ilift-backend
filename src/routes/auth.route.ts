import { Router } from 'express';
import { createNewUser } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/new', createNewUser);

export default authRoutes;
