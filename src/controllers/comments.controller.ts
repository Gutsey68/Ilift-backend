import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { commentPost, deleteComment, getCommentById, getComments, getCommentsOfPost, updateComment } from '../services/comments.service';
import { createNotification } from '../services/notifications.service';
import { getPostById } from '../services/posts.service';

export const createCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;

    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const existingPost = await getPostById(postId);

    if (!existingPost) {
      throw AppError.NotFound('Publication non trouvée', ErrorCodes.NOT_FOUND);
    }

    const { content } = req.body;
    const comment = await commentPost(content, req.user.id, postId);

    if (!comment) {
      throw AppError.BadRequest("Le commentaire n'a pas pu être posté", ErrorCodes.BAD_REQUEST);
    }

    if (existingPost.authorId !== req.user.id) {
      await createNotification(existingPost.authorId, req.user.id, 'comment', `${req.user.pseudo} a commenté votre publication`);
    }

    res.status(201).json({ message: 'Commentaire créé avec succès', data: comment });
  } catch (error) {
    next(error);
  }
};

export const getCommentsOfAPostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;

    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const existingPost = await getPostById(postId);

    if (!existingPost) {
      throw AppError.NotFound('Publication non trouvée', ErrorCodes.NOT_FOUND);
    }

    const comments = await getCommentsOfPost(postId);

    if (!comments) {
      throw AppError.NotFound('Aucun commentaire trouvé', ErrorCodes.NOT_FOUND);
    }

    const commentsWithPermission = comments.map(comment => ({
      ...comment,
      isMyComment: comment.usersId === req.user.id
    }));

    res.status(200).json({
      message: 'Commentaires récupérés avec succès',
      data: commentsWithPermission
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const comment = await getCommentById(id, req.user.id);

    if (!comment) {
      throw AppError.NotFound('Commentaire non trouvé', ErrorCodes.NOT_FOUND);
    }

    const deletedComment = await deleteComment(id, req.user.id);

    if (!deletedComment) {
      throw AppError.BadRequest("Le commentaire n'a pas pu être supprimé", ErrorCodes.BAD_REQUEST);
    }

    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};

export const updateCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const existingComment = await getCommentById(id, req.user.id);

    if (!existingComment) {
      throw AppError.NotFound('Commentaire non trouvé', ErrorCodes.NOT_FOUND);
    }

    const { content } = req.body;
    const comment = await updateComment(content, id, req.user.id);

    if (!comment) {
      throw AppError.BadRequest("Le commentaire n'a pas pu être mis à jour", ErrorCodes.BAD_REQUEST);
    }

    res.status(200).json({
      message: 'Commentaire mis à jour avec succès',
      data: comment
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const comments = await getComments();

    if (!comments) {
      throw AppError.NotFound('Aucun commentaire trouvé', ErrorCodes.NOT_FOUND);
    }

    res.status(200).json({
      message: 'Commentaires récupérés avec succès',
      data: comments
    });
  } catch (error) {
    next(error);
  }
};
