import { Router } from 'express';
import { getRefreshTokenHandler, loginHandler, registerHandler, unvalidateRefreshTokenHandler } from '../controllers/auth.controller';
import { refresh } from '../middlewares/refresh';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../validators/auth.validation';

const authRoute = Router();

authRoute.post('/login', validate(loginSchema), loginHandler);
authRoute.post('/register', validate(registerSchema), registerHandler);
authRoute.post('/refresh', refresh, getRefreshTokenHandler);
authRoute.put('/unvalidate/:id', unvalidateRefreshTokenHandler);

export default authRoute;
