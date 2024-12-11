import { Router } from 'express';
import { createNotificationHandler, deleteNotificationHandler, getNotificationsHandler } from '../controllers/notifications.controller';
import { protect } from '../middlewares/protect';

const notificationsRoutes = Router();

notificationsRoutes.get('/', protect, getNotificationsHandler);
notificationsRoutes.post('/', protect, createNotificationHandler);
notificationsRoutes.delete('/:id', protect, deleteNotificationHandler);

export default notificationsRoutes;
