import { Router } from 'express';
import authRoutes from './auth.routes';
import exercicesRoute from './exercices.routes';
import notificationsRoutes from './notifications.routes';
import postsRoutes from './posts.routes';
import programsRoute from './programs.routes';
import tagsRoutes from './tags.routes';
import userRoutes from './users.routes';

const router = Router();

router.use('/posts', postsRoutes);
router.use('/users', userRoutes);
router.use('/programs', programsRoute);
router.use('/auth', authRoutes);
router.use('/exercices', exercicesRoute);
router.use('/tags', tagsRoutes);
router.use('/notifications', notificationsRoutes);

export default router;
