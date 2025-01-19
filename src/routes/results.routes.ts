import { Router } from 'express';
import { createResultHandler, deleteResultHandler, deleteSetHandler, updateResultHandler } from '../controllers/results.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createResultSchema, updateResultSchema } from '../validators/results.validation';

const resultsRouter = Router();

resultsRouter.use(protect);

resultsRouter.post('/', validate(createResultSchema), createResultHandler);
resultsRouter.put('/:id', validate(updateResultSchema), updateResultHandler);
resultsRouter.delete('/:id', deleteResultHandler);
resultsRouter.delete('/:resultId/sets/:setId', deleteSetHandler);

export default resultsRouter;
