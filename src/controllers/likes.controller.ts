import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { getLikes, getLikesOfAUser, getLikesOfPost, likePost, unlikePost } from '../services/likes.service';
import { createNotification } from '../services/notifications.service';
import { getPostById } from '../services/posts.service';

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

export const getLikesHandler = async (req, res) => {
  try {
    const likes = await getLikes();

    if (!likes) {
      return res.status(404).json({ error: "Aucun j'aime trouvé" });
    }

    res.status(200).json({ message: "J'aime récupéré avec succès", data: likes });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getLikesOfAUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const page = parseInt(req.query.page as string) || 1;
    const likes = await getLikesOfAUser(req.params.id, page);

    const postsWithLikes = likes.map(like => ({
      ...like.posts,
      doILike: true
    }));

    res.status(200).json({
      message: "J'aime récupéré avec succès",
      data: postsWithLikes,
      pageParam: page
    });
  } catch (error) {
    next(error);
  }
};
