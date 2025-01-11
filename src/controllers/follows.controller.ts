import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { followUser, getFollowById, unfollowUser } from '../services/follows.service';
import { createNotification } from '../services/notifications.service';

export const followHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const follows = await followUser(req.user.id, req.params.id);
    await createNotification(req.params.id, req.user.id, 'follow', `${req.user.pseudo} a commencé à vous suivre`);

    res.status(200).json({
      message: 'Utilisateur suivi avec succès',
      data: follows
    });
  } catch (error) {
    next(error);
  }
};

export const unfollowHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    await getFollowById(req.user.id, req.params.id);
    await unfollowUser(req.user.id, req.params.id);

    res.status(200).json({
      message: "Arrêt du suivi de l'utilisateur avec succès"
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFollowerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    await getFollowById(req.params.id, req.user.id);
    await unfollowUser(req.params.id, req.user.id);

    res.status(200).json({
      message: 'Abonné supprimé avec succès'
    });
  } catch (error) {
    next(error);
  }
};
