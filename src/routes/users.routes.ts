/**
 * @fileoverview Configuration des routes pour les utilisateurs
 * Définit les endpoints protégés pour la gestion des utilisateurs
 */

import { Router } from 'express';
import {
  getCurrentUserHandler,
  getFollowersHandler,
  getFollowingsHandler,
  getSuggestedUsersHandler,
  getUserProfileHandler,
  getUsersAdminHandler,
  getUsersHandler,
  updateUserHandler
} from '../controllers/users.controller';
import upload from '../middlewares/multer.config';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { updateUserSchema } from '../validators/users.validation';

/**
 * Router Express pour les utilisateurs
 * @route GET /api/users/admin - Liste des utilisateurs (admin)
 * @route GET /api/users/me - Profil de l'utilisateur connecté
 * @route GET /api/users/suggested - Suggestions d'utilisateurs
 * @route GET /api/users/:id - Profil d'un utilisateur
 * @route GET /api/users/:id/followers - Abonnés d'un utilisateur
 * @route GET /api/users/:id/followings - Abonnements d'un utilisateur
 * @route PUT /api/users/:id - Mise à jour d'un profil
 */
const userRoutes = Router();

userRoutes.use(protect);

userRoutes.get('/admin', getUsersAdminHandler);
userRoutes.get('/me', getCurrentUserHandler);
userRoutes.get('/suggested', getSuggestedUsersHandler);
userRoutes.get('/', getUsersHandler);
userRoutes.get('/:id', getUserProfileHandler);
userRoutes.get('/:id/followers', getFollowersHandler);
userRoutes.get('/:id/followings', getFollowingsHandler);
userRoutes.put('/:id', upload.single('profilePhoto'), validate(updateUserSchema), updateUserHandler);

export default userRoutes;
