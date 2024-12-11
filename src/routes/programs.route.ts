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

const programsRoute = Router();

programsRoute.get('/', protect, getProgramsHandler);
programsRoute.get('/users/:id', protect, getProgramsOfUserHandler);
programsRoute.get('/:id/workouts', protect, getWorkoutsOfProgramHandler);

programsRoute.post('/', protect, createProgramHandler);
programsRoute.put('/:id', protect, updateProgramHandler);
programsRoute.delete('/:id', protect, deleteProgramHandler);

export default programsRoute;
