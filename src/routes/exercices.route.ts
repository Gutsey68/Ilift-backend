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

exercicesRoute.get('/:id/', protect, getExerciceAndResultsHandler);
exercicesRoute.get('/', protect, getExercicesHandler);

exercicesRoute.post('/', protect, postExerciceHandler);
exercicesRoute.put('/:id', protect, updateExerciceHandler);
exercicesRoute.delete('/:id', protect, deleteExerciceHandler);

export default exercicesRoute;
