/**
 * @fileoverview Configuration des routes d'authentification
 * Définit les endpoints et leurs middlewares associés
 */

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

/**
 * Routes d'authentification
 * @route POST /api/auth/login - Connexion utilisateur
 * @route POST /api/auth/register - Inscription utilisateur
 * @route POST /api/auth/reset-password - Demande de réinitialisation du mot de passe
 * @route POST /api/auth/update-password - Mise à jour du mot de passe
 * @route POST /api/auth/refresh - Rafraîchissement du token
 * @route PUT /api/auth/unvalidate/:id - Invalidation du token
 */
authRoute.post('/login', validate(loginSchema), loginHandler);
authRoute.post('/register', validate(registerSchema), registerHandler);
authRoute.post('/reset-password', validate(resetPasswordRequestSchema), resetPasswordHandler);
authRoute.post('/update-password', validate(updatePasswordSchema), updatePasswordHandler);
authRoute.post('/refresh', refresh, getRefreshTokenHandler);
authRoute.put('/unvalidate/:id', unvalidateRefreshTokenHandler);

export default authRoute;
