import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

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

export const getComments = async () => {
  const comments = await prisma.usersComments.findMany();

  if (!comments.length) {
    throw AppError.NotFound('Aucun commentaire trouvé', ErrorCodes.NOT_FOUND);
  }

  return comments;
};
