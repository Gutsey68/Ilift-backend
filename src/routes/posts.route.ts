import { Router } from 'express';
import { getAllPostsByUserHandler, getPostByIdHandler, getPostsHandler } from '../controllers/posts.controller';
import { protect } from '../services/auth.service';

const postsRoutes = Router();

postsRoutes.get('/', protect, getPostsHandler);
postsRoutes.get('/:id', getPostByIdHandler);
postsRoutes.get('/user/:userId', getAllPostsByUserHandler);

export default postsRoutes;
