/**
 * @fileoverview Configuration des routes pour les abonnements
 * Définit les endpoints protégés pour la gestion des relations de suivi
 */

import { Router } from 'express';
import { deleteFollowerHandler, followHandler, unfollowHandler } from '../controllers/follows.controller';
import { protect } from '../middlewares/protect';

/**
 * Router Express pour les abonnements
 * @route POST /api/follows/:id - Suivre un utilisateur
 * @route DELETE /api/follows/:id - Ne plus suivre un utilisateur
 * @route DELETE /api/follows/users/:id - Supprimer un abonné
 */
const followsRoutes = Router();

followsRoutes.use(protect);

followsRoutes.post('/:id', followHandler);
followsRoutes.delete('/:id', unfollowHandler);
followsRoutes.delete('/users/:id', deleteFollowerHandler);

export default followsRoutes;
