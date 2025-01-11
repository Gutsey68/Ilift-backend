import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

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
  MAX_FILE_SIZE: z.string().transform(Number).default('5242880')
});

const env = envSchema.parse(process.env);

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
