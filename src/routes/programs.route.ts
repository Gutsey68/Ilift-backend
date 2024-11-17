import { Router } from 'express';
import { getExercicesOfWorkoutHandler, getProgramsHandler, getProgramsOfUserHandler, getWorkoutsOfProgramHandler } from '../controllers/programs.controller';
import { protect } from '../middlewares/protect';

const programsRoute = Router();

programsRoute.get('/', protect, getProgramsHandler);
programsRoute.get('/users/:id', protect, getProgramsOfUserHandler);
programsRoute.get('/:id/workouts', protect, getWorkoutsOfProgramHandler);
programsRoute.get('/workouts/:id/exercices', protect, getExercicesOfWorkoutHandler);

export default programsRoute;
