import { Router } from 'express';
import { getExercicesOfWorkoutHandler } from '../controllers/programs.controller';
import { protect } from '../middlewares/protect';

const workoutsRoute = Router();

workoutsRoute.get('/workouts/:id/exercices', protect, getExercicesOfWorkoutHandler);

workoutsRoute.post('/', protect);
workoutsRoute.put('/:id', protect);
workoutsRoute.delete('/:id', protect);

export default workoutsRoute;
