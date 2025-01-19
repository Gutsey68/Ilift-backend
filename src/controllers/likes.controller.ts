/**
 * @fileoverview Contrôleurs pour la gestion des likes
 * Gère les requêtes liées aux "j'aime" sur les publications avec gestion d'erreurs personnalisée
 */

import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { getLikes, getLikesOfAUser, getLikesOfPost, likePost, unlikePost } from '../services/likes.service';
import { createNotification } from '../services/notifications.service';
import { getPostById } from '../services/posts.service';

/**
 * Gère l'action de liker une publication
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si la publication n'existe pas
 */
export const likePostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const post = await getPostById(req.params.id);
    const like = await likePost(req.params.id, req.user.id);

    if (post.authorId !== req.user.id) {
      await createNotification(post.authorId, req.user.id, 'like', `${req.user.pseudo} a aimé votre publication`);
    }

    res.status(200).json({
      message: 'Publication aimée avec succès',
      data: like
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Gère le retrait d'un like sur une publication
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si le like n'existe pas
 */
export const unlikePostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    await unlikePost(req.params.id, req.user.id);

    res.status(200).json({
      message: 'Publication non aimée avec succès'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère le nombre de likes d'une publication
 * @throws {AppError} Si la publication n'existe pas
 */
export const getLikesOfAPostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const likes = await getLikesOfPost(req.params.id);

    res.status(200).json({
      message: "J'aime récupéré avec succès",
      data: likes
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère tous les likes
 * @throws {AppError} Si aucun like n'est trouvé
 */
export const getLikesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const likes = await getLikes();

    if (!likes.length) {
      throw AppError.NotFound("Aucun j'aime trouvé", ErrorCodes.NOT_FOUND);
    }

    res.status(200).json({
      message: "J'aimes récupérés avec succès",
      data: likes
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère les likes d'un utilisateur avec pagination
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si aucun like n'est trouvé
 */
export const getLikesOfAUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const page = parseInt(req.query.page as string) || 1;
    if (page < 1) {
      throw AppError.BadRequest('Le numéro de page doit être positif', ErrorCodes.BAD_REQUEST);
    }

    const likes = await getLikesOfAUser(req.params.id, page);
    const postsWithLikes = likes.map(like => ({
      ...like.posts,
      doILike: true
    }));

    res.status(200).json({
      message: "J'aimes récupérés avec succès",
      data: postsWithLikes,
      pageParam: page
    });
  } catch (error) {
    next(error);
  }
};
