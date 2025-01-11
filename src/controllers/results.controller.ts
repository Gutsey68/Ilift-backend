import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { createResult, deleteResult, updateResult } from '../services/results.service';

export const createResultHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const result = await createResult(req.body, req.user.id);

    res.status(201).json({
      message: 'Résultat créé avec succès',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const updateResultHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const result = await updateResult(req.params.id, req.body);

    res.status(200).json({
      message: 'Résultat mis à jour avec succès',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResultHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    await deleteResult(req.params.id);

    res.status(200).json({
      message: 'Résultat supprimé avec succès'
    });
  } catch (error) {
    next(error);
  }
};
