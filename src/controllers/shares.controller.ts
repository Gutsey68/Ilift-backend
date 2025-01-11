import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { getPostById } from '../services/posts.service';
import { getShares, getSharesOfAUser, sharePost, unsharePost } from '../services/shares.service';

export const getSharesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const shares = await getShares();
    res.status(200).json({
      message: 'Republications récupérées avec succès',
      data: shares
    });
  } catch (error) {
    next(error);
  }
};

export const getSharesOfUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const page = parseInt(req.query.page as string) || 1;
    const shares = await getSharesOfAUser(req.params.id, page);

    const postsWithShares = shares.map(share => ({
      ...share.posts,
      isShared: true,
      sharedBy: share.usersId,
      sharedByUser: share.users,
      sharedAt: share.createdAt,
      doILike: false
    }));

    res.status(200).json({
      message: 'Republications récupérées avec succès',
      data: postsWithShares,
      pageParam: page
    });
  } catch (error) {
    next(error);
  }
};

export const shareHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const post = await getPostById(req.params.id);
    const share = await sharePost(req.params.id, req.user.id);

    res.status(200).json({
      message: 'Publication republiée avec succès',
      data: share
    });
  } catch (error) {
    next(error);
  }
};

export const unshareHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    await unsharePost(req.params.id, req.user.id);

    res.status(200).json({
      message: 'Republication supprimée avec succès'
    });
  } catch (error) {
    next(error);
  }
};
