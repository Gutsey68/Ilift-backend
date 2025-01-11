import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

export const getLikeById = async (postsId: string, usersId: string) => {
  const like = await prisma.usersLikes.findUnique({
    where: {
      postsId_usersId: { postsId, usersId }
    }
  });

  if (!like) {
    throw AppError.NotFound('Like non trouvé', ErrorCodes.NOT_FOUND);
  }

  return like;
};

export const checkLikeExists = async (postsId: string, usersId: string) => {
  return await prisma.usersLikes.findUnique({
    where: {
      postsId_usersId: { postsId, usersId }
    }
  });
};

export const likePost = async (postsId: string, usersId: string) => {
  try {
    const post = await prisma.posts.findUnique({
      where: { id: postsId }
    });

    if (!post) {
      throw AppError.NotFound('Publication non trouvée', ErrorCodes.NOT_FOUND);
    }

    return await prisma.usersLikes.create({
      data: { postsId, usersId }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw AppError.Conflict('Vous avez déjà aimé cette publication', ErrorCodes.DUPLICATE_ENTRY);
      }
    }
    throw error;
  }
};

export const unlikePost = async (postsId: string, usersId: string) => {
  try {
    return await prisma.usersLikes.delete({
      where: {
        postsId_usersId: { postsId, usersId }
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound("Vous n'avez pas aimé cette publication", ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

export const getLikesOfPost = async (postsId: string) => {
  const count = await prisma.usersLikes.count({
    where: { postsId }
  });

  return count;
};

export const getLikes = async () => {
  return await prisma.usersLikes.findMany();
};

export const getLikesOfAUser = async (usersId: string, page: number = 1) => {
  const likes = await prisma.usersLikes.findMany({
    where: { usersId },
    include: {
      posts: {
        include: {
          tags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          comments: true,
          likes: true,
          author: {
            select: {
              id: true,
              pseudo: true,
              profilePhoto: true
            }
          },
          _count: {
            select: {
              likes: true,
              comments: true
            }
          }
        }
      }
    },
    orderBy: {
      posts: {
        createdAt: 'desc'
      }
    },
    take: 10,
    skip: (page - 1) * 10
  });

  if (!likes.length) {
    throw AppError.NotFound("Aucun j'aime trouvé", ErrorCodes.NOT_FOUND);
  }

  return likes;
};
