import { Router } from 'express';
import { createWorkoutHandler, deleteWorkoutHandler, getExercicesOfWorkoutHandler, updateWorkoutHandler } from '../controllers/workouts.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createWorkoutSchema, deleteWorkoutSchema, getExercicesOfWorkoutSchema, updateWorkoutSchema } from '../validators/workouts.validation';

const workoutsRoute = Router();

workoutsRoute.get('/:id/exercices', protect, validate(getExercicesOfWorkoutSchema), getExercicesOfWorkoutHandler);
workoutsRoute.post('/', protect, validate(createWorkoutSchema), createWorkoutHandler);
workoutsRoute.put('/:id', protect, validate(updateWorkoutSchema), updateWorkoutHandler);
workoutsRoute.delete('/:id', protect, validate(deleteWorkoutSchema), deleteWorkoutHandler);

export default workoutsRoute;
