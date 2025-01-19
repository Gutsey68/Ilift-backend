/**
 * @fileoverview Service de gestion du processus d'onboarding
 * Fournit les fonctions pour gérer les étapes d'intégration des utilisateurs
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

/**
 * Met à jour l'étape d'onboarding d'un utilisateur
 * @param {string} userId - Identifiant de l'utilisateur
 * @param {number} step - Numéro de l'étape (1-3)
 * @throws {AppError} Si l'étape est invalide ou si l'utilisateur n'existe pas
 */
export const updateOnboardingStep = async (userId: string, step: number) => {
  try {
    if (step < 1 || step > 3) {
      throw AppError.BadRequest('Étape invalide', ErrorCodes.BAD_REQUEST);
    }

    return await prisma.user.update({
      where: { id: userId },
      data: { onboardingStep: step }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Utilisateur non trouvé', ErrorCodes.USER_NOT_FOUND);
      }
    }
    throw error;
  }
};

/**
 * Marque le processus d'onboarding comme terminé
 * @param {string} userId - Identifiant de l'utilisateur
 * @throws {AppError} Si les étapes précédentes ne sont pas complétées
 */
export const completeOnboarding = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { onboardingStep: true }
    });

    if (!user || user.onboardingStep < 3) {
      throw AppError.BadRequest('Les étapes précédentes doivent être complétées', ErrorCodes.BAD_REQUEST);
    }

    return await prisma.user.update({
      where: { id: userId },
      data: {
        isOnboardingCompleted: true,
        onboardingStep: 3
      }
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw AppError.BadRequest("Erreur lors de la complétion de l'onboarding", ErrorCodes.BAD_REQUEST);
  }
};
