import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

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
