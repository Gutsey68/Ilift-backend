import { Router } from 'express';
import {
  createNotificationHandler,
  deleteNotificationHandler,
  getNotificationsHandler,
  getNotificationsOfUserHandler,
  updateNotificationHandler
} from '../controllers/notifications.controller';
import { protect } from '../middlewares/protect';

const notificationsRoutes = Router();

notificationsRoutes.get('/', protect, getNotificationsHandler);
notificationsRoutes.get('/users/:id', protect, getNotificationsOfUserHandler);
notificationsRoutes.post('/', protect, createNotificationHandler);
notificationsRoutes.delete('/:id', protect, deleteNotificationHandler);
notificationsRoutes.put('/:id', protect, updateNotificationHandler);

export default notificationsRoutes;
