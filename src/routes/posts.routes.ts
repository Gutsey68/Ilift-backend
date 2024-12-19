import { Router } from 'express';
import {
  createCommentHandler,
  createPostHandler,
  deleteCommentHandler,
  deletePostHandler,
  getAllPostsByUserHandler,
  getCommentsHandler,
  getLikesOfAPostHandler,
  getPostByIdHandler,
  getPostsHandler,
  getPostsOfUserAndHisFollowingsHandler,
  likePostHandler,
  unlikePostHandler,
  updateCommentHandler,
  updatePostHandler
} from '../controllers/posts.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createCommentSchema, createPostSchema, updateCommentSchema, updatePostSchema } from '../validators/posts.validation';

const postsRoutes = Router();

postsRoutes.use(protect);

postsRoutes.get('/', getPostsHandler);
postsRoutes.get('/:id', getPostByIdHandler);
postsRoutes.get('/users/:userId', getAllPostsByUserHandler);
postsRoutes.get('/users/:userId/accueil', getPostsOfUserAndHisFollowingsHandler);
postsRoutes.post('/', validate(createPostSchema), createPostHandler);
postsRoutes.put('/:id', validate(updatePostSchema), updatePostHandler);
postsRoutes.delete('/:id', deletePostHandler);
postsRoutes.post('/:id/likes', likePostHandler);
postsRoutes.delete('/:id/likes', unlikePostHandler);
postsRoutes.get('/:id/likes', getLikesOfAPostHandler);
postsRoutes.post('/:id/comments', validate(createCommentSchema), createCommentHandler);
postsRoutes.get('/:id/comments', getCommentsHandler);
postsRoutes.delete('/comments/:id', deleteCommentHandler);
postsRoutes.put('/comments/:id', validate(updateCommentSchema), updateCommentHandler);

export default postsRoutes;
