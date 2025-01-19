/**
 * @fileoverview Service de gestion des republications
 * Fournit les fonctions CRUD pour les republications de posts
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

/**
 * Récupère toutes les republications
 * @throws {AppError} Si aucune republication n'est trouvée
 */
export const getShares = async () => {
  const shares = await prisma.usersShares.findMany();

  if (!shares.length) {
    throw AppError.NotFound('Aucune republication trouvée', ErrorCodes.NOT_FOUND);
  }

  return shares;
};

/**
 * Récupère une republication spécifique
 * @param {string} usersId - ID de l'utilisateur
 * @param {string} postsId - ID de la publication
 * @throws {AppError} Si la republication n'est pas trouvée
 */
export const getShareById = async (usersId: string, postsId: string) => {
  const share = await prisma.usersShares.findUnique({
    where: {
      postsId_usersId: { postsId, usersId }
    }
  });

  if (!share) {
    throw AppError.NotFound('Republication non trouvée', ErrorCodes.NOT_FOUND);
  }

  return share;
};

/**
 * Republie un post
 * @param {string} postsId - ID de la publication
 * @param {string} usersId - ID de l'utilisateur
 * @throws {AppError} Si la republication existe déjà
 */
export const sharePost = async (postsId: string, usersId: string) => {
  try {
    return await prisma.usersShares.create({
      data: { postsId, usersId }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw AppError.Conflict('Vous avez déjà republié cette publication', ErrorCodes.DUPLICATE_ENTRY);
      }
    }
    throw error;
  }
};

/**
 * Supprime une republication
 * @param {string} postsId - ID de la publication
 * @param {string} usersId - ID de l'utilisateur
 * @throws {AppError} Si la republication n'est pas trouvée
 */
export const unsharePost = async (postsId: string, usersId: string) => {
  try {
    return await prisma.usersShares.delete({
      where: {
        postsId_usersId: { postsId, usersId }
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Republication non trouvée', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

/**
 * Récupère les republications d'un utilisateur
 * @param {string} usersId - ID de l'utilisateur
 * @param {number} [page=1] - Numéro de la page
 * @throws {AppError} Si aucune republication n'est trouvée
 */
export const getSharesOfAUser = async (usersId: string, page: number = 1) => {
  const shares = await prisma.usersShares.findMany({
    where: { usersId },
    include: {
      users: {
        select: {
          id: true,
          pseudo: true
        }
      },
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
    orderBy: { createdAt: 'desc' },
    take: 10,
    skip: (page - 1) * 10
  });

  if (!shares.length) {
    throw AppError.NotFound('Aucune republication trouvée', ErrorCodes.NOT_FOUND);
  }

  return shares;
};
