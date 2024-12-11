import { Router } from 'express';
import { getAllPostsByUserHandler, getPostByIdHandler, getPostsHandler, getPostsOfUserAndHisFollowingsHandler } from '../controllers/posts.controller';
import { protect } from '../middlewares/protect';

const postsRoutes = Router();

postsRoutes.get('/', protect, getPostsHandler);
postsRoutes.get('/:id', getPostByIdHandler);
postsRoutes.get('/users/:userId', getAllPostsByUserHandler);
postsRoutes.get('/users/:userId/accueil', protect, getPostsOfUserAndHisFollowingsHandler);

postsRoutes.post('/', protect);
postsRoutes.put('/:id', protect);
postsRoutes.delete('/:id', protect);
postsRoutes.post('/:id/likes', protect);
postsRoutes.delete('/:id/likes', protect);
postsRoutes.get('/:id/likes', protect);
postsRoutes.post('/:id/comments', protect);
postsRoutes.get('/:id/comments', protect);
postsRoutes.delete('/:id/comments/:commentId', protect);
postsRoutes.put('/:id/comments/:commentId', protect);

export default postsRoutes;
