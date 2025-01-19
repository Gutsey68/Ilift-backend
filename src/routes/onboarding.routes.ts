/**
 * @fileoverview Configuration des routes pour l'onboarding
 * Définit les endpoints protégés pour la gestion du processus d'intégration
 */

import { Router } from 'express';
import { completeOnboardingHandler, updateOnboardingStepHandler } from '../controllers/onboarding.controller';
import { protect } from '../middlewares/protect';

/**
 * Router Express pour l'onboarding
 * @route PUT /api/onboarding/step - Met à jour l'étape d'onboarding
 * @route POST /api/onboarding/complete - Termine le processus d'onboarding
 */
const onboardingRoutes = Router();

onboardingRoutes.use(protect);

onboardingRoutes.put('/step', updateOnboardingStepHandler);
onboardingRoutes.post('/complete', completeOnboardingHandler);

export default onboardingRoutes;
