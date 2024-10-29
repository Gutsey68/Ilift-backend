import { getAllPostsByUser, getPostById, getPosts } from '../services/post.service';

export const getPostsHandler = async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPostByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await getPostById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllPostsByUserHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await getAllPostsByUser(userId);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPostsByFollowedUsers = async (req, res) => {};
export const createPost = async (req, res) => {};
export const updatePost = async (req, res) => {};
export const deletePost = async (req, res) => {};
