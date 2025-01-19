/**
 * @fileoverview Configuration des routes pour les résultats d'exercices
 * Définit les endpoints protégés pour la gestion des résultats et séries
 */

import { Router } from 'express';
import { createResultHandler, deleteResultHandler, deleteSetHandler, updateResultHandler } from '../controllers/results.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createResultSchema, updateResultSchema } from '../validators/results.validation';

/**
 * Router Express pour les résultats
 * @route POST /api/results - Crée un nouveau résultat
 * @route PUT /api/results/:id - Modifie un résultat existant
 * @route DELETE /api/results/:id - Supprime un résultat
 * @route DELETE /api/results/:resultId/sets/:setId - Supprime une série spécifique
 */
const resultsRouter = Router();

resultsRouter.use(protect);

resultsRouter.post('/', validate(createResultSchema), createResultHandler);
resultsRouter.put('/:id', validate(updateResultSchema), updateResultHandler);
resultsRouter.delete('/:id', deleteResultHandler);
resultsRouter.delete('/:resultId/sets/:setId', deleteSetHandler);

export default resultsRouter;
