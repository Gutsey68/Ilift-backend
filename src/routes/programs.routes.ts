/**
 * @fileoverview Configuration des routes pour les programmes d'entraînement
 * Définit les endpoints protégés pour la gestion des programmes
 */

import { Router } from 'express';
import {
  createProgramHandler,
  deleteProgramHandler,
  getProgramsHandler,
  getProgramsOfUserHandler,
  getWorkoutsOfProgramHandler,
  updateProgramHandler
} from '../controllers/programs.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createProgramSchema, updateProgramSchema } from '../validators/programs.validation';

/**
 * Router Express pour les programmes
 * @route GET /api/programs - Liste tous les programmes
 * @route GET /api/programs/me - Liste les programmes de l'utilisateur connecté
 * @route GET /api/programs/:id/workouts - Liste les séances d'un programme
 * @route POST /api/programs - Crée un nouveau programme
 * @route PUT /api/programs/:id - Modifie un programme
 * @route DELETE /api/programs/:id - Supprime un programme
 */
const programsRoute = Router();

programsRoute.use(protect);

programsRoute.get('/', getProgramsHandler);
programsRoute.get('/me', getProgramsOfUserHandler);
programsRoute.get('/:id/workouts', getWorkoutsOfProgramHandler);
programsRoute.post('/', validate(createProgramSchema), createProgramHandler);
programsRoute.put('/:id', validate(updateProgramSchema), updateProgramHandler);
programsRoute.delete('/:id', deleteProgramHandler);

export default programsRoute;
