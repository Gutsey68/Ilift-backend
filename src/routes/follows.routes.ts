import { Router } from 'express';
import { deleteFollowerHandler, followHandler, unfollowHandler } from '../controllers/follows.controller';
import { protect } from '../middlewares/protect';

const followsRoutes = Router();

followsRoutes.use(protect);

followsRoutes.post('/:id', followHandler);
followsRoutes.delete('/:id', unfollowHandler);
followsRoutes.delete('/users/:id', deleteFollowerHandler);

export default followsRoutes;
