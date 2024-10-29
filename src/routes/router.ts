import { Router } from 'express';
import postsRoutes from './posts.route';
import programsRoute from './programs.route';
import userRoutes from './user.route';

const router = Router();

router.use('/posts', postsRoutes);
router.use('/users', userRoutes);
router.use('/programs', programsRoute);

export default router;
