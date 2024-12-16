import { Router } from 'express';
import {
  createCommentHandler,
  createPostHandler,
  deleteCommentHandler,
  deletePostHandler,
  getAllPostsByUserHandler,
  getCommentsHandler,
  getLikesHandler,
  getPostByIdHandler,
  getPostsHandler,
  getPostsOfUserAndHisFollowingsHandler,
  likePostHandler,
  unlikePostHandler,
  updateCommentHandler,
  updatePostHandler
} from '../controllers/posts.controller';
import { protect } from '../middlewares/protect';

const postsRoutes = Router();

postsRoutes.use(protect);

postsRoutes.get('/', getPostsHandler);
postsRoutes.get('/:id', getPostByIdHandler);
postsRoutes.get('/users/:userId', getAllPostsByUserHandler);
postsRoutes.get('/users/:userId/accueil', getPostsOfUserAndHisFollowingsHandler);

postsRoutes.post('/', createPostHandler);
postsRoutes.put('/:id', updatePostHandler);
postsRoutes.delete('/:id', deletePostHandler);
postsRoutes.post('/:id/likes', likePostHandler);
postsRoutes.delete('/:id/likes', unlikePostHandler);
postsRoutes.get('/:id/likes', getLikesHandler);
postsRoutes.post('/:id/comments', createCommentHandler);
postsRoutes.get('/:id/comments', getCommentsHandler);
postsRoutes.delete('/comments/:id', deleteCommentHandler);
postsRoutes.put('/comments/:id', updateCommentHandler);

export default postsRoutes;
