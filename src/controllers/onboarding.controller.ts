/**
 * @fileovview Contrôleurs pour la gestion de l'onboarding
 * Gère les requêtes liées au processus d'intégration des utilisateurs
 */

import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { completeOnboarding, updateOnboardingStep } from '../services/onboarding.service';

/**
 * Gère la complétion du processus d'onboarding
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si les étapes ne sont pas complètes
 */
export const completeOnboardingHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const result = await completeOnboarding(req.user.id);

    res.status(200).json({
      message: 'Onboarding complété avec succès',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Gère la mise à jour de l'étape d'onboarding
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si l'étape est invalide
 */
export const updateOnboardingStepHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const step = Number(req.body.step);
    if (isNaN(step)) {
      throw AppError.BadRequest("L'étape doit être un nombre", ErrorCodes.BAD_REQUEST);
    }

    const result = await updateOnboardingStep(req.user.id, step);

    res.status(200).json({
      message: "Étape de l'onboarding mise à jour avec succès",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
