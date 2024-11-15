import { Router } from 'express';
import { getAllPostsByUserHandler, getPostByIdHandler, getPostsHandler, getPostsOfUserAndHisFollowingsHandler } from '../controllers/posts.controller';
import { protect } from '../middlewares/protect';

const postsRoutes = Router();

postsRoutes.get('/', protect, getPostsHandler);
postsRoutes.get('/:id', getPostByIdHandler);
postsRoutes.get('/users/:userId', getAllPostsByUserHandler);
postsRoutes.get('/users/:userId/accueil', protect, getPostsOfUserAndHisFollowingsHandler);

export default postsRoutes;
