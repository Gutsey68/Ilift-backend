import { Router } from 'express';
import authRoutes from './auth.route';
import exercicesRoute from './exercices.route';
import postsRoutes from './posts.route';
import programsRoute from './programs.route';
import tagsRoutes from './tags.route';
import userRoutes from './user.route';

const router = Router();

router.use('/posts', postsRoutes);
router.use('/users', userRoutes);
router.use('/programs', programsRoute);
router.use('/auth', authRoutes);
router.use('/exercices', exercicesRoute);
router.use('/tags', tagsRoutes);

export default router;
