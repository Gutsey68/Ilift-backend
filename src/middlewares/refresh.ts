/**
 * @fileoverview Middleware de gestion du rafraîchissement des tokens JWT
 * Vérifie la validité du refresh token et prépare le payload pour un nouveau token
 */

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import { AppError, ErrorCodes } from '../errors/app.error';
import { FindRefreshToken } from '../services/auth.service';

/**
 * Interface décrivant la structure du payload JWT
 * @interface JWTPayload
 */
interface JWTPayload {
  id: string;
  pseudo: string;
  email: string;
  roleId?: string;
  iat?: number;
  exp?: number;
}

/**
 * Middleware de validation et rafraîchissement des tokens
 * @param {Request} req - Requête Express
 * @param {Response} res - Réponse Express
 * @param {NextFunction} next - Fonction suivante dans la chaîne de middleware
 * @throws {AppError} Si le token est manquant, invalide ou expiré
 */
export const refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refreshToken = req.headers.authorization?.split(' ')[1];

    if (!refreshToken) {
      throw AppError.Unauthorized('Token de rafraîchissement manquant.', ErrorCodes.INVALID_TOKEN);
    }

    try {
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as JWTPayload;
      const storedToken = await FindRefreshToken(refreshToken);

      if (!storedToken || !storedToken.isValid) {
        throw AppError.Unauthorized('Token invalide ou expiré. Veuillez vous reconnecter.', ErrorCodes.INVALID_TOKEN);
      }

      req.refreshPayload = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw AppError.Unauthorized('Le token de rafraîchissement a expiré.', ErrorCodes.EXPIRED_TOKEN);
      }
      throw AppError.Unauthorized('Token de rafraîchissement invalide.', ErrorCodes.INVALID_TOKEN);
    }
  } catch (error) {
    next(error);
  }
};
