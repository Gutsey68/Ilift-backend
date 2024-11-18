import { Router } from 'express';
import { getExerciceAndResultsHandler } from '../controllers/exercices.controller';
import { protect } from '../middlewares/protect';

const exercicesRoute = Router();

exercicesRoute.get('/:id/', protect, getExerciceAndResultsHandler);

export default exercicesRoute;
