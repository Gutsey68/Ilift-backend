import { Router } from 'express';
import {
  deleteExerciceHandler,
  getExerciceAndResultsHandler,
  getExercicesHandler,
  postExerciceHandler,
  updateExerciceHandler
} from '../controllers/exercices.controller';
import { protect } from '../middlewares/protect';

const exercicesRoute = Router();

exercicesRoute.use(protect);

exercicesRoute.get('/:id/', getExerciceAndResultsHandler);
exercicesRoute.get('/', getExercicesHandler);

exercicesRoute.post('/', postExerciceHandler);
exercicesRoute.put('/:id', updateExerciceHandler);
exercicesRoute.delete('/:id', deleteExerciceHandler);

export default exercicesRoute;
