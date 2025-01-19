/**
 * @fileoverview Contrôleurs pour la gestion des exercices
 * Gère les requêtes liées aux exercices et leurs résultats
 */

import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { createExercice, deleteExercice, getAllExercices, getExerciceAndResults, updateExercice } from '../services/exercices.service';

/**
 * Récupère un exercice avec ses résultats
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si l'exercice n'existe pas
 */
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

/**
 * Récupère tous les exercices
 * @throws {AppError} En cas d'erreur lors de la récupération
 */
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

/**
 * Crée un nouvel exercice
 * @throws {AppError} Si les données sont invalides ou si l'exercice existe déjà
 */
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

/**
 * Met à jour un exercice existant
 * @throws {AppError} Si l'exercice n'existe pas ou si les données sont invalides
 */
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

/**
 * Supprime un exercice
 * @throws {AppError} Si l'exercice n'existe pas
 */
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
