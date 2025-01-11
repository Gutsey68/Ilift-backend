import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { completeOnboarding, updateOnboardingStep } from '../services/onboarding.service';

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
