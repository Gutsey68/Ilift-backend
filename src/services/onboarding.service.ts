import prisma from '../database/db';

export const updateOnboardingStep = async (userId: string, step: number) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { onboardingStep: step }
  });
};

export const completeOnboarding = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      isOnboardingCompleted: true,
      onboardingStep: 3
    }
  });
};
