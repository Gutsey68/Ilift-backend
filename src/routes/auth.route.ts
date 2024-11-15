import { Router } from 'express';
import { createNewUserHandler, signinHandler } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', createNewUserHandler);
authRoutes.post('/login', signinHandler);

export default authRoutes;
