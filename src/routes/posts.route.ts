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

postsRoutes.get('/', protect, getPostsHandler);
postsRoutes.get('/:id', getPostByIdHandler);
postsRoutes.get('/users/:userId', getAllPostsByUserHandler);
postsRoutes.get('/users/:userId/accueil', protect, getPostsOfUserAndHisFollowingsHandler);

postsRoutes.post('/', protect, createPostHandler);
postsRoutes.put('/:id', protect, updatePostHandler);
postsRoutes.delete('/:id', protect, deletePostHandler);
postsRoutes.post('/:id/likes', protect, likePostHandler);
postsRoutes.delete('/:id/likes', protect, unlikePostHandler);
postsRoutes.get('/:id/likes', protect, getLikesHandler);
postsRoutes.post('/:id/comments', protect, createCommentHandler);
postsRoutes.get('/:id/comments', protect, getCommentsHandler);
postsRoutes.delete('/:id/comments/:commentId', protect, deleteCommentHandler);
postsRoutes.put('/:id/comments/:commentId', protect, updateCommentHandler);

export default postsRoutes;
