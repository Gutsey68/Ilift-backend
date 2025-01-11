import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

export const followUser = async (followedById: string, followingId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: followingId }
    });

    if (!user) {
      throw AppError.NotFound('Utilisateur non trouvé', ErrorCodes.USER_NOT_FOUND);
    }

    if (followedById === followingId) {
      throw AppError.BadRequest('Vous ne pouvez pas vous suivre vous-même', ErrorCodes.BAD_REQUEST);
    }

    return await prisma.follows.create({
      data: { followedById, followingId }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw AppError.Conflict('Vous suivez déjà cet utilisateur', ErrorCodes.DUPLICATE_ENTRY);
    }
    throw error;
  }
};

export const unfollowUser = async (followingId: string, followedById: string) => {
  try {
    return await prisma.follows.deleteMany({
      where: {
        followedBy: { id: followingId },
        following: { id: followedById }
      }
    });
  } catch (error) {
    throw AppError.BadRequest("Erreur lors de l'arrêt du suivi", ErrorCodes.BAD_REQUEST);
  }
};

export const getFollowById = async (followedById: string, followingId: string) => {
  const follow = await prisma.follows.findFirst({
    where: { followedById, followingId }
  });

  if (!follow) {
    throw AppError.NotFound('Relation de suivi non trouvée', ErrorCodes.NOT_FOUND);
  }

  return follow;
};

export const checkFollowExists = async (followerId: string, followedId: string) => {
  return await prisma.follows.findUnique({
    where: {
      followingId_followedById: {
        followedById: followerId,
        followingId: followedId
      }
    }
  });
};
