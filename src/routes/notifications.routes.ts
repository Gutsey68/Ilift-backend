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

notificationsRoutes.use(protect);

notificationsRoutes.get('/', getNotificationsHandler);
notificationsRoutes.get('/users/:id', getNotificationsOfUserHandler);
notificationsRoutes.post('/', validate(createNotificationSchema), createNotificationHandler);
notificationsRoutes.delete('/:id', validate(deleteNotificationSchema), deleteNotificationHandler);
notificationsRoutes.put('/:id', validate(updateNotificationSchema), updateNotificationHandler);

export default notificationsRoutes;
