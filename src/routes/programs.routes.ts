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

const programsRoute = Router();

programsRoute.use(protect);

programsRoute.get('/', getProgramsHandler);
programsRoute.get('/me', getProgramsOfUserHandler);
programsRoute.get('/:id/workouts', getWorkoutsOfProgramHandler);
programsRoute.post('/', validate(createProgramSchema), createProgramHandler);
programsRoute.put('/:id', validate(updateProgramSchema), updateProgramHandler);
programsRoute.delete('/:id', deleteProgramHandler);

export default programsRoute;
