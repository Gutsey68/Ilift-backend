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

programsRoute.use(protect);

programsRoute.get('/', getProgramsHandler);
programsRoute.get('/users/:id', getProgramsOfUserHandler);
programsRoute.get('/:id/workouts', getWorkoutsOfProgramHandler);

programsRoute.post('/', createProgramHandler);
programsRoute.put('/:id', updateProgramHandler);
programsRoute.delete('/:id', deleteProgramHandler);

export default programsRoute;
