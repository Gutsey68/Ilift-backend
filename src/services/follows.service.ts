import prisma from '../database/db';

export const followUser = async (followedById: string, followingId: string) => {
  return await prisma.follows.create({
    data: {
      followedById,
      followingId
    }
  });
};

export const unfollowUser = async (followingId: string, followedById: string) => {
  return await prisma.follows.deleteMany({
    where: {
      followedBy: {
        id: followingId
      },
      following: {
        id: followedById
      }
    }
  });
};

export const getFollowById = async (followedById: string, followingId: string) => {
  return prisma.follows.findFirst({
    where: {
      followedById,
      followingId
    }
  });
};
