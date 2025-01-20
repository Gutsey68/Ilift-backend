/**
 * @fileoverview Configuration des middlewares de sécurité de l'application
 * Inclut la limitation de débit, la protection contre les attaques XSS,
 * la compression et d'autres mesures de sécurité
 */

import compression from 'compression';
import { Express, NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { config } from './environment';

/**
 * Configure les middlewares de sécurité pour l'application Express
 * @param {Express} app - L'instance de l'application Express
 */
export const configureSecurityMiddleware = (app: Express): void => {
  /**
   * Configuration de Helmet avec les politiques de sécurité personnalisées
   */
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'", config.client.url],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"]
        }
      },
      crossOriginEmbedderPolicy: true,
      crossOriginOpenerPolicy: true,
      crossOriginResourcePolicy: {
        policy: 'cross-origin'
      },
      dnsPrefetchControl: true,
      frameguard: {
        action: 'deny'
      },
      hidePoweredBy: true,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      },
      ieNoOpen: true,
      noSniff: true,
      referrerPolicy: {
        policy: 'same-origin'
      },
      xssFilter: true
    })
  );

  /**
   * Configuration de la compression des réponses
   */
  app.use(
    compression({
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }
        return compression.filter(req, res);
      },
      level: 6
    })
  );

  /**
   * Middlewares spécifiques au mode production
   */
  if (config.isProd) {
    /**
     * Redirection HTTPS
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.secure) {
        next();
      } else {
        res.redirect(301, `https://${req.headers.host}${req.url}`);
      }
    });

    /**
     * En-têtes de sécurité supplémentaires
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      next();
    });
  }

  /**
   * Limiteur de débit spécifique pour les routes d'authentification
   */
  const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    message: {
      status: 'error',
      message: 'Trop de tentatives de connexion, veuillez réessayer dans une heure'
    }
  });

  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
};
