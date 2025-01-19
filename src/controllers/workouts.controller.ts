/**
 * @fileovview Contrôleurs pour la gestion des séances d'entraînement
 * Gère les requêtes liées aux séances et leurs exercices
 */

import { NextFunction, Request, Response } from 'express';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';
import { createWorkout, deleteWorkout, getExercicesOfWorkout, updateWorkout, updateWorkoutExercices } from '../services/workouts.service';

/**
 * Récupère les exercices d'une séance
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si la séance n'existe pas
 */
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

/**
 * Crée une nouvelle séance
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si les données sont invalides
 */
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

/**
 * Met à jour une séance existante
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si la séance n'existe pas
 */
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

/**
 * Supprime une séance
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si la séance n'existe pas
 */
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

/**
 * Met à jour la liste des exercices d'une séance
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si la mise à jour échoue
 */
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

/**
 * Met à jour la position d'un exercice dans une séance
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si la mise à jour échoue
 */
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
