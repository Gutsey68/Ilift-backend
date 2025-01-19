/**
 * @fileoverview Configuration des routes pour les republications
 * Définit les endpoints protégés pour la gestion des republications
 */

import { Router } from 'express';
import { getSharesHandler, getSharesOfUserHandler, shareHandler, unshareHandler } from '../controllers/shares.controller';
import { protect } from '../middlewares/protect';

/**
 * Router Express pour les republications
 * @route GET /api/shares - Liste toutes les republications
 * @route GET /api/shares/users/:id - Liste les republications d'un utilisateur
 * @route POST /api/shares/posts/:id - Republie une publication
 * @route DELETE /api/shares/posts/:id - Annule une republication
 */
const sharesRoutes = Router();

sharesRoutes.use(protect);

sharesRoutes.get('/', getSharesHandler);
sharesRoutes.get('/users/:id', getSharesOfUserHandler);
sharesRoutes.post('/posts/:id', shareHandler);
sharesRoutes.delete('/posts/:id', unshareHandler);

export default sharesRoutes;
