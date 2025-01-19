/**
 * @fileoverview Configuration des routes pour les séances d'entraînement
 * Définit les endpoints protégés pour la gestion des séances
 */

import { Router } from 'express';
import {
  createWorkoutHandler,
  deleteWorkoutHandler,
  getExercicesOfWorkoutHandler,
  updateExercicePositionHandler,
  updateWorkoutExercicesHandler,
  updateWorkoutHandler
} from '../controllers/workouts.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createWorkoutSchema, deleteWorkoutSchema, getExercicesOfWorkoutSchema, updateWorkoutSchema } from '../validators/workouts.validation';

/**
 * Router Express pour les séances d'entraînement
 * @route GET /api/workouts/:id/exercices - Liste les exercices d'une séance
 * @route POST /api/workouts - Crée une nouvelle séance
 * @route PUT /api/workouts/:id - Modifie une séance
 * @route PUT /api/workouts/:id/exercices - Met à jour les exercices d'une séance
 * @route PUT /api/workouts/:workoutId/exercices/:exerciceId - Met à jour la position d'un exercice
 * @route DELETE /api/workouts/:id - Supprime une séance
 */
const workoutsRoute = Router();

workoutsRoute.use(protect);

workoutsRoute.get('/:id/exercices', validate(getExercicesOfWorkoutSchema), getExercicesOfWorkoutHandler);
workoutsRoute.post('/', validate(createWorkoutSchema), createWorkoutHandler);
workoutsRoute.put('/:id', validate(updateWorkoutSchema), updateWorkoutHandler);
workoutsRoute.put('/:id/exercices', updateWorkoutExercicesHandler);
workoutsRoute.put('/:workoutId/exercices/:exerciceId', updateExercicePositionHandler);
workoutsRoute.delete('/:id', validate(deleteWorkoutSchema), deleteWorkoutHandler);

export default workoutsRoute;
