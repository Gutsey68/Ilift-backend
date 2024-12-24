import { Router } from 'express';
import { getSharesHandler, getSharesOfUserHandler, shareHandler, unshareHandler } from '../controllers/shares.controller';
import { protect } from '../middlewares/protect';

const sharesRoutes = Router();

sharesRoutes.use(protect);

sharesRoutes.get('/', getSharesHandler);
sharesRoutes.get('/users/:id', getSharesOfUserHandler);
sharesRoutes.post('/posts/:id', shareHandler);
sharesRoutes.delete('/posts/:id', unshareHandler);

export default sharesRoutes;
