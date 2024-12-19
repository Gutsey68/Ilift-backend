import { Router } from 'express';
import {
  createCommentHandler,
  deleteCommentHandler,
  getCommentsHandler,
  getCommentsOfAPostHandler,
  updateCommentHandler
} from '../controllers/comments.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createCommentSchema, updateCommentSchema } from '../validators/posts.validation';

const commentsRoutes = Router();

commentsRoutes.use(protect);

commentsRoutes.get('/', getCommentsHandler);
commentsRoutes.post('/posts/:id', validate(createCommentSchema), createCommentHandler);
commentsRoutes.get('/posts/:id', getCommentsOfAPostHandler);
commentsRoutes.delete('/:id', deleteCommentHandler);
commentsRoutes.put('/:id', validate(updateCommentSchema), updateCommentHandler);

export default commentsRoutes;
