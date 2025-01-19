/**
 * @fileoverview Configuration des routes pour les commentaires
 * Définit les endpoints protégés pour la gestion des commentaires
 */

import { Router } from 'express';
import {
  createCommentHandler,
  deleteCommentHandler,
  getCommentsHandler,
  getCommentsOfAPostHandler,
  updateCommentHandler
} from '../controllers/comments.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createCommentSchema, updateCommentSchema } from '../validators/posts.validation';

/**
 * Router Express pour les commentaires
 * @route GET /api/comments - Liste tous les commentaires
 * @route POST /api/comments/posts/:id - Crée un commentaire
 * @route GET /api/comments/posts/:id - Liste les commentaires d'une publication
 * @route DELETE /api/comments/:id - Supprime un commentaire
 * @route PUT /api/comments/:id - Modifie un commentaire
 */
const commentsRoutes = Router();

commentsRoutes.use(protect);

commentsRoutes.get('/', getCommentsHandler);
commentsRoutes.post('/posts/:id', validate(createCommentSchema), createCommentHandler);
commentsRoutes.get('/posts/:id', getCommentsOfAPostHandler);
commentsRoutes.delete('/:id', deleteCommentHandler);
commentsRoutes.put('/:id', validate(updateCommentSchema), updateCommentHandler);

export default commentsRoutes;
