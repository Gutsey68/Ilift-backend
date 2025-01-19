/**
 * @fileoverview Service de gestion des commentaires
 * Fournit les fonctions CRUD pour les commentaires des publications
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

/**
 * Crée un nouveau commentaire sur une publication
 * @returns {Promise<Comment>} Le commentaire créé
 * @throws {AppError} Si la publication n'existe pas
 */
export const commentPost = async (content: string, usersId: string, postsId: string) => {
  try {
    const post = await prisma.posts.findUnique({
      where: { id: postsId }
    });

    if (!post) {
      throw AppError.NotFound('Publication non trouvée', ErrorCodes.NOT_FOUND);
    }

    return await prisma.usersComments.create({
      data: {
        content,
        usersId,
        postsId
      }
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw AppError.BadRequest('Erreur lors de la création du commentaire', ErrorCodes.BAD_REQUEST);
  }
};

/**
 * Récupère tous les commentaires d'une publication
 * @returns {Promise<Comment[]>} Liste des commentaires
 */
export const getCommentsOfPost = async (postsId: string) => {
  try {
    const comments = await prisma.usersComments.findMany({
      where: { postsId },
      include: {
        users: {
          select: {
            id: true,
            pseudo: true,
            profilePhoto: true
          }
        }
      }
    });

    return comments;
  } catch (error) {
    throw AppError.BadRequest('Erreur lors de la récupération des commentaires', ErrorCodes.BAD_REQUEST);
  }
};

/**
 * Supprime un commentaire d'une publication
 * @returns {Promise<Comment>} Le commentaire supprimé
 * @throws {AppError} Si le commentaire n'existe pas
 */
export const deleteComment = async (postsId: string, usersId: string) => {
  try {
    return await prisma.usersComments.delete({
      where: {
        postsId_usersId: {
          postsId,
          usersId
        }
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Commentaire non trouvé', ErrorCodes.NOT_FOUND);
      }
    }
    throw AppError.BadRequest('Erreur lors de la suppression du commentaire', ErrorCodes.BAD_REQUEST);
  }
};

/**
 * Récupère un commentaire par ID
 * @returns {Promise<Comment>} Le commentaire trouvé
 * @throws {AppError} Si le commentaire n'existe pas
 */
export const getCommentById = async (postsId: string, usersId: string) => {
  const comment = await prisma.usersComments.findUnique({
    where: {
      postsId_usersId: {
        postsId,
        usersId
      }
    }
  });

  if (!comment) {
    throw AppError.NotFound('Commentaire non trouvé', ErrorCodes.NOT_FOUND);
  }

  return comment;
};

/**
 * Met à jour un commentaire
 * @returns {Promise<Comment>} Le commentaire mis à jour
 * @throws {AppError} Si le commentaire n'existe pas
 */
export const updateComment = async (content: string, postsId: string, usersId: string) => {
  try {
    return await prisma.usersComments.update({
      where: {
        postsId_usersId: {
          postsId,
          usersId
        }
      },
      data: { content }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Commentaire non trouvé', ErrorCodes.NOT_FOUND);
      }
    }
    throw AppError.BadRequest('Erreur lors de la mise à jour du commentaire', ErrorCodes.BAD_REQUEST);
  }
};

/**
 * Récupère tous les commentaires
 * @returns {Promise<Comment[]>} Liste des commentaires
 * @throws {AppError} Si aucun commentaire n'est trouvé
 */
export const getComments = async () => {
  const comments = await prisma.usersComments.findMany();

  if (!comments.length) {
    throw AppError.NotFound('Aucun commentaire trouvé', ErrorCodes.NOT_FOUND);
  }

  return comments;
};
