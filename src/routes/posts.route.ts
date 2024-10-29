import { Router } from 'express';
import { getAllPostsByUser, getPostById, getPosts, getPostsByFollowedUsers } from '../controllers/posts.controller';

const postsRoutes = Router();

postsRoutes.get('/', getPosts);
postsRoutes.get('/:id', getPostById);
postsRoutes.get('/user/:userId', getAllPostsByUser);
postsRoutes.get('/followed/:userId', getPostsByFollowedUsers);

export default postsRoutes;
