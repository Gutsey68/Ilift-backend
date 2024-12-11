import { Router } from 'express';
import {
  createNotificationHandler,
  deleteNotificationHandler,
  getNotificationsHandler,
  updateNotificationHandler
} from '../controllers/notifications.controller';
import { protect } from '../middlewares/protect';

const notificationsRoutes = Router();

notificationsRoutes.get('/', protect, getNotificationsHandler);
notificationsRoutes.post('/', protect, createNotificationHandler);
notificationsRoutes.delete('/:id', protect, deleteNotificationHandler);
notificationsRoutes.put('/:id', protect, updateNotificationHandler);

export default notificationsRoutes;
