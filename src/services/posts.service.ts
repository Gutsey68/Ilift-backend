import prisma from '../database/db';

export const getPosts = async () => {
  return await prisma.posts.findMany();
};

export const getPostById = async (id: string) => {
  return await prisma.posts.findUnique({
    where: { id }
  });
};

export const getAllPostsByUser = async (userId: string) => {
  return await prisma.posts.findMany({
    where: {
      author: {
        id: userId
      }
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      },
      author: true,
      _count: {
        select: {
          likes: true
        }
      }
    }
  });
};

export const getPostsOfUserAndHisFollowings = async (userId: string, page: number) => {
  const followedUsers = await prisma.follows.findMany({
    where: {
      followedById: userId
    },
    select: {
      followingId: true
    }
  });

  const userIds = [userId, ...followedUsers.map(follow => follow.followingId)];

  const posts = await prisma.posts.findMany({
    where: {
      authorId: {
        in: userIds
      }
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      },
      author: true,
      _count: {
        select: {
          likes: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: (page - 1) * 10,
    take: 10
  });

  return posts;
};

export const createPost = async (photo: string, content: string, authorId: string) => {
  return await prisma.posts.create({
    data: {
      photo,
      content,
      authorId
    }
  });
};

export const updatePost = async (data, id) => {
  return await prisma.posts.update({
    where: { id },
    data
  });
};

export const deletePost = async (id: string) => {
  return await prisma.posts.delete({
    where: { id }
  });
};
