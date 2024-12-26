import { Router } from 'express';
import {
  getRefreshTokenHandler,
  loginHandler,
  registerHandler,
  resetPasswordHandler,
  unvalidateRefreshTokenHandler,
  updatePasswordHandler
} from '../controllers/auth.controller';
import { refresh } from '../middlewares/refresh';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema, resetPasswordRequestSchema, updatePasswordSchema } from '../validators/auth.validation';

const authRoute = Router();

authRoute.post('/login', validate(loginSchema), loginHandler);
authRoute.post('/register', validate(registerSchema), registerHandler);
authRoute.post('/reset-password', validate(resetPasswordRequestSchema), resetPasswordHandler);
authRoute.post('/update-password', validate(updatePasswordSchema), updatePasswordHandler);
authRoute.post('/refresh', refresh, getRefreshTokenHandler);
authRoute.put('/unvalidate/:id', unvalidateRefreshTokenHandler);

export default authRoute;
