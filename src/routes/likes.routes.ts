import { Router } from 'express';
import { getLikesOfAPostHandler, likePostHandler, unlikePostHandler } from '../controllers/likes.controller';
import { protect } from '../middlewares/protect';

const likesRoutes = Router();

likesRoutes.use(protect);

likesRoutes.get('/, getLikesHandler');
likesRoutes.post('/posts/:id', likePostHandler);
likesRoutes.delete('/posts/:id', unlikePostHandler);
likesRoutes.get('/posts/:id', getLikesOfAPostHandler);

export default likesRoutes;
