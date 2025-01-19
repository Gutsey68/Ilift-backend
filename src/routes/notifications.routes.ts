/**
 * @fileoverview Configuration des routes pour les notifications
 * Définit les endpoints protégés pour la gestion des notifications utilisateur
 */

import { Router } from 'express';
import {
  createNotificationHandler,
  deleteNotificationHandler,
  getNotificationsHandler,
  getNotificationsOfUserHandler,
  updateNotificationHandler,
  markAllAsReadHandler
} from '../controllers/notifications.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createNotificationSchema, deleteNotificationSchema, updateNotificationSchema } from '../validators/notifications.validation';

/**
 * Router Express pour les notifications
 * @route GET /api/notifications - Liste toutes les notifications
 * @route GET /api/notifications/users/:id - Liste les notifications d'un utilisateur
 * @route POST /api/notifications - Crée une notification
 * @route DELETE /api/notifications/:id - Supprime une notification
 * @route PUT /api/notifications/:id - Modifie une notification
 * @route PATCH /api/notifications/read-all - Marque toutes les notifications comme lues
 */
const notificationsRoutes = Router();

notificationsRoutes.use(protect);

notificationsRoutes.get('/', getNotificationsHandler);
notificationsRoutes.get('/users/:id', getNotificationsOfUserHandler);
notificationsRoutes.post('/', validate(createNotificationSchema), createNotificationHandler);
notificationsRoutes.delete('/:id', validate(deleteNotificationSchema), deleteNotificationHandler);
notificationsRoutes.put('/:id', validate(updateNotificationSchema), updateNotificationHandler);
notificationsRoutes.patch('/read-all', markAllAsReadHandler);

export default notificationsRoutes;
