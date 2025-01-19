/**
 * @fileoverview Configuration des routes pour les exercices
 * Définit les endpoints protégés pour la gestion des exercices
 */

import { Router } from 'express';
import {
  createExerciceHandler,
  deleteExerciceHandler,
  getExerciceAndResultsHandler,
  getExercicesHandler,
  updateExerciceHandler
} from '../controllers/exercices.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createExerciceSchema, updateExerciceSchema } from '../validators/exercices.validation';

/**
 * Router Express pour les exercices
 * @route GET /api/exercices/:id - Récupère un exercice et ses résultats
 * @route GET /api/exercices - Liste tous les exercices
 * @route POST /api/exercices - Crée un nouvel exercice
 * @route PUT /api/exercices/:id - Modifie un exercice
 * @route DELETE /api/exercices/:id - Supprime un exercice
 */
const exercicesRoute = Router();

exercicesRoute.use(protect);

exercicesRoute.get('/:id/', getExerciceAndResultsHandler);
exercicesRoute.get('/', getExercicesHandler);
exercicesRoute.post('/', validate(createExerciceSchema), createExerciceHandler);
exercicesRoute.put('/:id', validate(updateExerciceSchema), updateExerciceHandler);
exercicesRoute.delete('/:id', deleteExerciceHandler);

export default exercicesRoute;
