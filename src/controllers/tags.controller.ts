import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { createTag, deleteTag, getTags, updateTag } from '../services/tags.service';

export const getTagsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const tags = await getTags();

    res.status(200).json({
      message: 'Tags récupérés avec succès',
      data: tags
    });
  } catch (error) {
    next(error);
  }
};

export const createTagHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const tag = await createTag(req.body.name);

    res.status(201).json({
      message: 'Tag créé avec succès',
      data: tag
    });
  } catch (error) {
    next(error);
  }
};

export const updateTagHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const updatedTag = await updateTag(req.params.id, req.body.name);

    res.status(200).json({
      message: 'Tag modifié avec succès',
      data: updatedTag
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTagHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    await deleteTag(req.params.id);

    res.status(200).json({
      message: 'Tag supprimé avec succès'
    });
  } catch (error) {
    next(error);
  }
};
