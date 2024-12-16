import { Router } from 'express';
import { loginHandler, registerHandler } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../validators/auth.validation';

const authRoute = Router();

authRoute.post('/login', validate(loginSchema), loginHandler);
authRoute.post('/register', validate(registerSchema), registerHandler);

export default authRoute;
