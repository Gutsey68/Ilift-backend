import { Router } from 'express';
import {
  createExerciceHandler,
  deleteExerciceHandler,
  getExerciceAndResultsHandler,
  getExercicesHandler,
  updateExerciceHandler
} from '../controllers/exercices.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createExerciceSchema, updateExerciceSchema } from '../validators/exercices.validation';

const exercicesRoute = Router();

exercicesRoute.use(protect);

exercicesRoute.get('/:id/', getExerciceAndResultsHandler);
exercicesRoute.get('/', getExercicesHandler);
exercicesRoute.post('/', validate(createExerciceSchema), createExerciceHandler);
exercicesRoute.put('/:id', validate(updateExerciceSchema), updateExerciceHandler);
exercicesRoute.delete('/:id', deleteExerciceHandler);

export default exercicesRoute;
