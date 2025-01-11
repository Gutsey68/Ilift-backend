import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { getAllMuscleGroups } from '../services/musclegroups.service';

export const getMuscleGroupsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const muscleGroups = await getAllMuscleGroups();

    res.status(200).json({
      message: 'Groupes musculaires récupérés avec succès',
      data: muscleGroups
    });
  } catch (error) {
    next(error);
  }
};
