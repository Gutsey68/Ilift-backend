import { Router } from 'express';
import { getAllPostsByUserHandler, getPostByIdHandler, getPostsHandler } from '../controllers/posts.controller';

const postsRoutes = Router();

postsRoutes.get('/', getPostsHandler);
postsRoutes.get('/:id', getPostByIdHandler);
postsRoutes.get('/user/:userId', getAllPostsByUserHandler);

export default postsRoutes;
