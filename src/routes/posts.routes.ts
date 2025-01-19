/**
 * @fileoverview Configuration des routes pour les publications
 * Définit les endpoints protégés pour la gestion des publications
 */

import { Router } from 'express';
import {
  createPostHandler,
  deletePostHandler,
  getAllPostsByUserHandler,
  getPostByIdHandler,
  getPostsHandler,
  getPostsOfUserAndHisFollowingsHandler,
  updatePostHandler
} from '../controllers/posts.controller';
import upload from '../middlewares/multer.config';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createPostSchema, updatePostSchema } from '../validators/posts.validation';

/**
 * Router Express pour les publications
 * @route GET /api/posts - Liste toutes les publications
 * @route GET /api/posts/:id - Récupère une publication
 * @route GET /api/posts/users/:userId - Liste les publications d'un utilisateur
 * @route GET /api/posts/users/:userId/accueil - Flux d'accueil personnalisé
 * @route POST /api/posts - Crée une publication
 * @route PUT /api/posts/:id - Modifie une publication
 * @route DELETE /api/posts/:id - Supprime une publication
 */
const postsRoutes = Router();

postsRoutes.use(protect);

postsRoutes.get('/', getPostsHandler);
postsRoutes.get('/:id', getPostByIdHandler);
postsRoutes.get('/users/:userId', getAllPostsByUserHandler);
postsRoutes.get('/users/:userId/accueil', getPostsOfUserAndHisFollowingsHandler);
postsRoutes.post('/', upload.single('photo'), validate(createPostSchema), createPostHandler);
postsRoutes.put('/:id', upload.single('photo'), validate(updatePostSchema), updatePostHandler);
postsRoutes.delete('/:id', deletePostHandler);

export default postsRoutes;
