import { Router } from 'express';
import { getPrograms } from '../controllers/programs.controller';

const programsRoute = Router();

programsRoute.get('/programs', getPrograms);

export default programsRoute;
