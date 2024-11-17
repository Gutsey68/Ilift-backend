import { Router } from 'express';
import { getProgramsHandler, getProgramsOfUserHandler } from '../controllers/programs.controller';
import { protect } from '../middlewares/protect';

const programsRoute = Router();

programsRoute.get('/', protect, getProgramsHandler);
programsRoute.get('/users/:id', protect, getProgramsOfUserHandler);

export default programsRoute;
