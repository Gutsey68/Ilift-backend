import { Router } from 'express';
import { getSharesHandler, getSharesOfUserHandler, shareHandler, unshareHandler } from '../controllers/shares.controller';
import { protect } from '../middlewares/protect';

const sharesRoutes = Router();

sharesRoutes.use(protect);

sharesRoutes.get('/', getSharesHandler);
sharesRoutes.get('/user/:id', getSharesOfUserHandler);
sharesRoutes.post('/post/:id', shareHandler);
sharesRoutes.delete('/post/:id', unshareHandler);

export default sharesRoutes;
