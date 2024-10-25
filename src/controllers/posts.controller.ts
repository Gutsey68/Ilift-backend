import prisma from '../database/db';

export const getPosts = async (req, res) => {
  const posts = await prisma.posts.findMany();

  res.status(200).json({ data: posts });
};

export const getPostById = async (req, res) => {
  const id = req.params.id;
  const post = await prisma.posts.findUnique({
    where: {
      id: id
    }
  });

  res.status(200).json({ data: post });
};

export const getAllPostsByUser = async (req, res) => {
  const userId = req.params.userId;
  const posts = await prisma.posts.findMany({
    where: {
      author: {
        id: userId
      }
    }
  });

  res.status(200).json({ data: posts });
};
export const getPostsByFollowedUsers = async (req, res) => {};
