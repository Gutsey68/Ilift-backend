import { NextFunction, Request, Response } from 'express';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';
import { createWorkout, deleteWorkout, getExercicesOfWorkout, updateWorkout, updateWorkoutExercices } from '../services/workouts.service';

export const getExercicesOfWorkoutHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const exercices = await getExercicesOfWorkout(req.params.id);

    res.status(200).json({
      message: 'Exercices récupérés avec succès',
      data: exercices
    });
  } catch (error) {
    next(error);
  }
};

export const createWorkoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const workout = await createWorkout(req.body.name, req.body.programId, req.user.id);

    res.status(201).json({
      message: 'Séance créée avec succès',
      data: workout
    });
  } catch (error) {
    next(error);
  }
};

export const updateWorkoutHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const workout = await updateWorkout(req.params.id, req.body);

    res.status(200).json({
      message: 'Séance mise à jour avec succès',
      data: workout
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWorkoutHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    await deleteWorkout(req.params.id);

    res.status(200).json({
      message: 'Séance supprimée avec succès'
    });
  } catch (error) {
    next(error);
  }
};

export const updateWorkoutExercicesHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const workout = await updateWorkoutExercices(req.params.id, req.body.exerciceIds);

    res.status(200).json({
      message: 'Exercices de la séance mis à jour avec succès',
      data: workout
    });
  } catch (error) {
    next(error);
  }
};

export const updateExercicePositionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { workoutId, exerciceId } = req.params;
    const { position } = req.body;

    await prisma.workoutsExercises.update({
      where: {
        exerciceId_workoutId: {
          exerciceId,
          workoutId
        }
      },
      data: {
        position
      }
    });

    res.status(200).json({
      message: 'Position mise à jour avec succès'
    });
  } catch (error) {
    next(error);
  }
};
