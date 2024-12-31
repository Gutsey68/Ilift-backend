import { Router } from 'express';
import {
  createWorkoutHandler,
  deleteWorkoutHandler,
  getExercicesOfWorkoutHandler,
  updateWorkoutHandler,
  updateWorkoutExercicesHandler
} from '../controllers/workouts.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createWorkoutSchema, deleteWorkoutSchema, getExercicesOfWorkoutSchema, updateWorkoutSchema } from '../validators/workouts.validation';

const workoutsRoute = Router();

workoutsRoute.use(protect);

workoutsRoute.get('/:id/exercices', validate(getExercicesOfWorkoutSchema), getExercicesOfWorkoutHandler);
workoutsRoute.post('/', validate(createWorkoutSchema), createWorkoutHandler);
workoutsRoute.put('/:id', validate(updateWorkoutSchema), updateWorkoutHandler);
workoutsRoute.put('/:id/exercices', updateWorkoutExercicesHandler);
workoutsRoute.delete('/:id', validate(deleteWorkoutSchema), deleteWorkoutHandler);

export default workoutsRoute;
