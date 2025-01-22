/**
 * @fileoverview Configuration des variables d'environnement de l'application
 * Utilise dotenv pour charger les variables d'environnement et Zod pour la validation
 */

import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

/**
 * Schéma de validation des variables d'environnement
 * @typedef {z.infer<typeof envSchema>} EnvSchema
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET est requis'),
  JWT_EXPIRES_IN: z.string().default('1h'),
  REFRESH_TOKEN_SECRET: z.string().min(1, 'REFRESH_TOKEN_SECRET est requis'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
  RESEND_API_KEY: z.string(),
  CLIENT_URL: z.string().default('http://localhost:5173'),
  UPLOAD_DIR: z.string().default('uploads'),
  MAX_FILE_SIZE: z.string().transform(Number).default('25242880')
});

/**
 * Variables d'environnement validées
 * @type {z.infer<typeof envSchema>}
 */
const env: z.infer<typeof envSchema> = envSchema.parse(process.env);

/**
 * Configuration globale de l'application
 * @typedef {typeof config} Config
 * @property {boolean} isDev - Indique si l'application est en mode développement
 * @property {boolean} isProd - Indique si l'application est en mode production
 * @property {number} port - Port d'écoute du serveur
 * @property {Object} database - Configuration de la base de données
 * @property {Object} jwt - Configuration des tokens JWT
 * @property {Object} email - Configuration du service d'emails
 * @property {Object} client - Configuration du client frontend
 * @property {Object} upload - Configuration des uploads de fichiers
 */
export const config = {
  isDev: env.NODE_ENV === 'development',
  isProd: env.NODE_ENV === 'production',
  port: env.PORT,
  database: {
    url: env.DATABASE_URL
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
    refreshSecret: env.REFRESH_TOKEN_SECRET,
    refreshExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN
  },
  email: {
    resendApiKey: env.RESEND_API_KEY
  },
  client: {
    url: env.CLIENT_URL
  },
  upload: {
    dir: env.UPLOAD_DIR,
    maxSize: env.MAX_FILE_SIZE
  }
} as const;
