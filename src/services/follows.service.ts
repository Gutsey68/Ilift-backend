import prisma from '../database/db';

export const followUser = async (followingId: string, followedById: string) => {
  return await prisma.follows.create({
    data: {
      followingId,
      followedById
    }
  });
};

export const unfollowUser = async (followingId: string, followedById: string) => {
  return await prisma.follows.deleteMany({
    where: {
      followingId,
      followedById
    }
  });
};

export const getFollowById = async (followingId: string, followedById: string) => {
  return prisma.follows.findFirst({
    where: {
      followingId,
      followedById
    }
  });
};
