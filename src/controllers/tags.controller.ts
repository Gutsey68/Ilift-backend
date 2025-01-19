/**
 * @fileovview Contrôleurs pour la gestion des tags
 * Gère les requêtes liées aux tags des publications
 */

import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { createTag, deleteTag, getTags, updateTag } from '../services/tags.service';

/**
 * Récupère tous les tags
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
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

/**
 * Crée un nouveau tag
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si le tag existe déjà
 */
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

/**
 * Modifie un tag existant
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
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

/**
 * Supprime un tag existant
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
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
