-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isOnboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboardingStep" INTEGER NOT NULL DEFAULT 0;
