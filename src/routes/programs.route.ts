import { Router } from 'express';
import { getProgramsHandler, getProgramsOfUserHandler, getWorkoutsOfProgramHandler } from '../controllers/programs.controller';
import { protect } from '../middlewares/protect';

const programsRoute = Router();

programsRoute.get('/', protect, getProgramsHandler);
programsRoute.get('/users/:id', protect, getProgramsOfUserHandler);
programsRoute.get('/:id/workouts', protect, getWorkoutsOfProgramHandler);

programsRoute.post('/', protect);
programsRoute.put('/:id', protect);
programsRoute.delete('/:id', protect);

export default programsRoute;
