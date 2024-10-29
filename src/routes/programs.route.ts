import { Router } from 'express';
import { getProgramsHandler } from '../controllers/programs.controller';

const programsRoute = Router();

programsRoute.get('/', getProgramsHandler);

export default programsRoute;
