import { Router } from 'express';
import { getAllPostsByUser, getPostById, getPosts, getPostsByFollowedUsers } from '../controllers/posts.controller';
import { getPrograms } from '../controllers/programs.controller';
import { getUserById, getUsers } from '../controllers/user.controller';

const router = Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.get('/posts/user/:userId', getAllPostsByUser);
router.get('/posts/followed/:userId', getPostsByFollowedUsers);

router.get('/users', getUsers);
router.get('/users/:id', getUserById);

router.get('/programs', getPrograms);

export default router;
