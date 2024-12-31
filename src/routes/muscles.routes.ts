import { Router } from 'express';
import { protect } from '../middlewares/protect';
import { getMuscleGroupsHandler } from '../controllers/musclegroups.controller';

const musclesgroupRouter = Router();

musclesgroupRouter.get('/', protect, getMuscleGroupsHandler);

export default musclesgroupRouter;
