import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { createExercice, deleteExercice, getAllExercices, getExerciceAndResults, updateExercice } from '../services/exercices.service';

export const getExerciceAndResultsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const exercice = await getExerciceAndResults(req.params.id, req.user.id);

    res.status(200).json({
      message: 'Données récupérées avec succès',
      data: { exercices: exercice }
    });
  } catch (error) {
    next(error);
  }
};

export const getExercicesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercices = await getAllExercices();
    res.status(200).json({
      message: 'Exercices récupérés avec succès',
      data: exercices
    });
  } catch (error) {
    next(error);
  }
};

export const createExerciceHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercice = await createExercice(req.body);

    res.status(201).json({
      message: 'Exercice créé avec succès',
      data: exercice
    });
  } catch (error) {
    next(error);
  }
};

export const updateExerciceHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercice = await updateExercice(req.params.id, req.body);

    res.status(200).json({
      message: 'Exercice mis à jour avec succès',
      data: exercice
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExerciceHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteExercice(req.params.id);

    res.status(200).json({
      message: 'Exercice supprimé avec succès'
    });
  } catch (error) {
    next(error);
  }
};
