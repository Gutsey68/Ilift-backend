import { Router } from 'express';
import {
  createPostHandler,
  deletePostHandler,
  getAllPostsByUserHandler,
  getPostByIdHandler,
  getPostsHandler,
  getPostsOfUserAndHisFollowingsHandler,
  updatePostHandler
} from '../controllers/posts.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createPostSchema, updatePostSchema } from '../validators/posts.validation';

const postsRoutes = Router();

postsRoutes.use(protect);

postsRoutes.get('/', getPostsHandler);
postsRoutes.get('/:id', getPostByIdHandler);
postsRoutes.get('/users/:userId', getAllPostsByUserHandler);
postsRoutes.get('/users/:userId/accueil', getPostsOfUserAndHisFollowingsHandler);
postsRoutes.post('/', validate(createPostSchema), createPostHandler);
postsRoutes.put('/:id', validate(updatePostSchema), updatePostHandler);
postsRoutes.delete('/:id', deletePostHandler);

export default postsRoutes;
