/**
 * @fileoverview Configuration du serveur Express
 * Initialise les middlewares, les routes et la gestion des erreurs
 */

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { config } from './config/environment';
import { configureSecurityMiddleware } from './config/security';
import { errorHandler } from './middlewares/error.handler';
import router from './routes/router';

/**
 * Instance de l'application Express
 * @type {express.Application}
 */
const app = express();

//configureSecurityMiddleware(app);

/**
 * Configuration CORS
 */
app.use(
    cors({
        origin: config.client.url,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
        exposedHeaders: ['Authorization']
    })
);

/**
 * Middlewares de base
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Route de test
 */
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

/**
 * Routes de l'API et fichiers statiques
 */
app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, '..', config.upload.dir)));

/**
 * Middleware de gestion des erreurs
 */
app.use(errorHandler);

export default app;
