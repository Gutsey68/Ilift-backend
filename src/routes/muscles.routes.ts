/**
 * @fileovview Configuration des routes pour les groupes musculaires
 * Définit les endpoints protégés pour l'accès aux groupes musculaires
 */

import { Router } from 'express';
import { getMuscleGroupsHandler } from '../controllers/musclegroups.controller';
import { protect } from '../middlewares/protect';

/**
 * Router Express pour les groupes musculaires
 * @route GET /api/muscles - Liste tous les groupes musculaires
 */
const musclesgroupRouter = Router();

musclesgroupRouter.get('/', protect, getMuscleGroupsHandler);

export default musclesgroupRouter;
