/**
 * @fileoverview Configuration des routes pour les likes
 * Définit les endpoints protégés pour la gestion des "j'aime"
 */

import { Router } from 'express';
import { getLikesOfAPostHandler, getLikesOfAUserHandler, likePostHandler, unlikePostHandler } from '../controllers/likes.controller';
import { protect } from '../middlewares/protect';

/**
 * Router Express pour les likes
 * @route GET /api/likes - Liste tous les likes
 * @route POST /api/likes/posts/:id - Aime une publication
 * @route DELETE /api/likes/posts/:id - Retire le like d'une publication
 * @route GET /api/likes/posts/:id - Compte les likes d'une publication
 * @route GET /api/likes/users/:id - Liste les likes d'un utilisateur
 */
const likesRoutes = Router();

likesRoutes.use(protect);

likesRoutes.get('/, getLikesHandler');
likesRoutes.post('/posts/:id', likePostHandler);
likesRoutes.delete('/posts/:id', unlikePostHandler);
likesRoutes.get('/posts/:id', getLikesOfAPostHandler);
likesRoutes.get('/users/:id', getLikesOfAUserHandler);

export default likesRoutes;
