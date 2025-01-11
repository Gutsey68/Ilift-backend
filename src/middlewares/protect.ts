import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import { AppError, ErrorCodes } from '../errors/app.error';

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      throw AppError.Unauthorized('Non autorisé. Veuillez vous connecter.', ErrorCodes.INVALID_TOKEN);
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret);

      req.user = typeof decoded === 'string' ? JSON.parse(decoded) : decoded;
      next();
    } catch (error) {
      console.error('JWT Error:', error);
      throw AppError.Unauthorized('Token invalide. Veuillez vous reconnecter.', ErrorCodes.INVALID_TOKEN);
    }
  } catch (error) {
    next(error);
  }
};
