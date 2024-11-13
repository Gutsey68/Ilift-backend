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
    }
  });
};

export const getPostsOfUserAndHisFollowings = async (userId: string) => {
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
      author: true,
      _count: {
        select: {
          likes: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return posts;
};
