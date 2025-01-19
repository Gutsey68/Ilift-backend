/**
 * @fileoverview Utilitaires de gestion des tokens JWT
 * Fournit des fonctions pour créer des tokens d'accès et de rafraîchissement
 */

import jwt from 'jsonwebtoken';
import { config } from '../config/environment';

/**
 * Interface décrivant les données utilisateur pour les tokens JWT
 * @interface JWTUser
 */
interface JWTUser {
  id: string;
  pseudo: string;
  email?: string;
  roleId?: string;
}

/**
 * Crée un token JWT d'accès
 * @param {JWTUser} user - Données utilisateur à inclure dans le token
 * @returns {string} Token JWT signé
 * @throws {Error} Si la clé secrète JWT n'est pas définie
 */
export const createJWT = (user: JWTUser): string => {
  if (!config.jwt.secret) throw new Error('JWT_SECRET non défini');
  return jwt.sign({ id: user.id, pseudo: user.pseudo }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

/**
 * Crée un token JWT de rafraîchissement
 * @param {JWTUser} user - Données utilisateur à inclure dans le token
 * @returns {string} Token de rafraîchissement signé
 * @throws {Error} Si la clé secrète de rafraîchissement n'est pas définie
 */
export const createRefreshToken = (user: JWTUser): string => {
  if (!config.jwt.refreshSecret) throw new Error('REFRESH_TOKEN_SECRET non défini');
  return jwt.sign({ id: user.id, pseudo: user.pseudo }, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiresIn });
};
