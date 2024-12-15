import { Router } from 'express';
import {
  createNotificationHandler,
  deleteNotificationHandler,
  getNotificationsHandler,
  getNotificationsOfUserHandler,
  updateNotificationHandler
} from '../controllers/notifications.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createNotificationSchema, deleteNotificationSchema, updateNotificationSchema } from '../validators/notifications.validation';

const notificationsRoutes = Router();

notificationsRoutes.get('/', protect, getNotificationsHandler);
notificationsRoutes.get('/users/:id', protect, getNotificationsOfUserHandler);
notificationsRoutes.post('/', protect, validate(createNotificationSchema), createNotificationHandler);
notificationsRoutes.delete('/:id', protect, validate(deleteNotificationSchema), deleteNotificationHandler);
notificationsRoutes.put('/:id', protect, validate(updateNotificationSchema), updateNotificationHandler);

export default notificationsRoutes;
