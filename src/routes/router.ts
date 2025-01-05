import { Router } from 'express';
import authRoutes from './auth.routes';
import commentsRoutes from './comments.routes';
import exercicesRoute from './exercices.routes';
import followsRoutes from './follows.routes';
import likesRoutes from './likes.routes';
import musclesgroupRouter from './muscles.routes';
import notificationsRoutes from './notifications.routes';
import postsRoutes from './posts.routes';
import programsRoute from './programs.routes';
import sharesRoutes from './shares.routes';
import tagsRoutes from './tags.routes';
import userRoutes from './users.routes';
import workoutsRoute from './workouts.routes';
import resultsRouter from './results.routes';
import onboardingRoutes from './onboarding.routes';

const router = Router();

router.use('/posts', postsRoutes);
router.use('/users', userRoutes);
router.use('/programs', programsRoute);
router.use('/auth', authRoutes);
router.use('/exercices', exercicesRoute);
router.use('/workouts', workoutsRoute);
router.use('/tags', tagsRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/comments', commentsRoutes);
router.use('/likes', likesRoutes);
router.use('/follows', followsRoutes);
router.use('/shares', sharesRoutes);
router.use('/muscles', musclesgroupRouter);
router.use('/results', resultsRouter);
router.use('/onboarding', onboardingRoutes);

export default router;
