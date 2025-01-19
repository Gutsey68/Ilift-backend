/**
 * @fileoverview Service de gestion des likes
 * Fournit les fonctions pour gérer les interactions "j'aime" sur les publications
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

/**
 * Récupère un like par son ID unique (postId + userId)
 * @throws {AppError} Si le like n'est pas trouvé
 */
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

/**
 * Vérifie si un like existe déjà
 * @returns {Promise<Like|null>} Le like s'il existe, null sinon
 */
export const checkLikeExists = async (postsId: string, usersId: string) => {
  return await prisma.usersLikes.findUnique({
    where: {
      postsId_usersId: { postsId, usersId }
    }
  });
};

/**
 * Ajoute un like à une publication
 * @throws {AppError} Si la publication n'est pas trouvée ou si le like existe déjà
 */
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

/**
 * Supprime un like d'une publication
 * @throws {AppError} Si le like n'est pas trouvé
 */
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

/**
 * Récupère le nombre de likes d'une publication
 * @returns {Promise<number>} Le nombre de likes
 */
export const getLikesOfPost = async (postsId: string) => {
  const count = await prisma.usersLikes.count({
    where: { postsId }
  });

  return count;
};

/**
 * Récupère tous les likes
 * @returns {Promise<Like[]>} La liste de tous les likes
 */
export const getLikes = async () => {
  return await prisma.usersLikes.findMany();
};

/**
 * Récupère les likes d'un utilisateur avec pagination
 * @throws {AppError} Si aucun like n'est trouvé
 * @returns {Promise<Like[]>} La liste des likes de l'utilisateur
 */
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
