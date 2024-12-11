import { Router } from 'express';
import { getExercicesOfWorkoutHandler } from '../controllers/programs.controller';
import { createWorkoutHandler, deleteWorkoutHandler, updateWorkoutHandler } from '../controllers/workouts.controller';
import { protect } from '../middlewares/protect';

const workoutsRoute = Router();

workoutsRoute.get('/workouts/:id/exercices', protect, getExercicesOfWorkoutHandler);

workoutsRoute.post('/', protect, createWorkoutHandler);
workoutsRoute.put('/:id', protect, updateWorkoutHandler);
workoutsRoute.delete('/:id', protect, deleteWorkoutHandler);

export default workoutsRoute;
