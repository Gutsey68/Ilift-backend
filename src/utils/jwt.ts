import jwt from 'jsonwebtoken';
import { config } from '../config/environment';

interface JWTUser {
  id: string;
  pseudo: string;
  email?: string;
  roleId?: string;
}

export const createJWT = (user: JWTUser): string => {
  if (!config.jwt.secret) throw new Error('JWT_SECRET non défini');
  return jwt.sign({ id: user.id, pseudo: user.pseudo }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

export const createRefreshToken = (user: JWTUser): string => {
  if (!config.jwt.refreshSecret) throw new Error('REFRESH_TOKEN_SECRET non défini');
  return jwt.sign({ id: user.id, pseudo: user.pseudo }, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiresIn });
};
