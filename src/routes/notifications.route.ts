import { Router } from 'express';
import { protect } from '../middlewares/protect';

const notificationsRoutes = Router();

notificationsRoutes.get('/', protect);
notificationsRoutes.post('/', protect);
notificationsRoutes.delete('/:id', protect);

export default notificationsRoutes;
