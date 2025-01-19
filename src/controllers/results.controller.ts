/**
 * @fileovview Contrôleurs pour la gestion des résultats d'exercices
 * Gère les requêtes liées aux résultats et leurs séries
 */

import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { createResult, deleteResult, deleteSet, updateResult } from '../services/results.service';

/**
 * Crée un nouveau résultat d'exercice
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
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

/**
 * Met à jour un résultat existant
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si le résultat n'existe pas
 */
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

/**
 * Supprime un résultat
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si le résultat n'existe pas
 */
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

/**
 * Supprime une série spécifique d'un résultat
 * @throws {AppError} Si la série ou le résultat n'existe pas
 */
export const deleteSetHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteSet(req.params.resultId, req.params.setId);

    res.status(200).json({
      message: 'Série supprimée avec succès'
    });
  } catch (error) {
    next(error);
  }
};
