import { Router } from 'express';
import { getExerciceAndResultsHandler, getExercicesHandler } from '../controllers/exercices.controller';
import { protect } from '../middlewares/protect';

const exercicesRoute = Router();

exercicesRoute.get('/:id/', protect, getExerciceAndResultsHandler);
exercicesRoute.get('/', protect, getExercicesHandler);

exercicesRoute.post('/', protect);
exercicesRoute.put('/:id', protect);
exercicesRoute.delete('/:id', protect);

export default exercicesRoute;
