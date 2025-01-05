import { Router } from 'express';
import { completeOnboardingHandler, updateOnboardingStepHandler } from '../controllers/onboarding.controller';
import { protect } from '../middlewares/protect';

const onboardingRoutes = Router();

onboardingRoutes.use(protect);

onboardingRoutes.put('/step', updateOnboardingStepHandler);
onboardingRoutes.post('/complete', completeOnboardingHandler);

export default onboardingRoutes;
