import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';
import { CreateResultData, UpdateResultData } from '../types/result.types';

export const createResult = async (data: CreateResultData, userId: string) => {
  try {
    const exercice = await prisma.exercices.findUnique({
      where: { id: data.exerciceId }
    });

    if (!exercice) {
      throw AppError.NotFound('Exercice non trouvé', ErrorCodes.EXERCICE_NOT_FOUND);
    }

    return await prisma.exerciceResults.create({
      data: {
        exerciceId: data.exerciceId,
        userId,
        sets: {
          createMany: {
            data: data.sets.map(set => ({
              reps: set.reps,
              weight: set.weight
            }))
          }
        }
      },
      include: { sets: true }
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw AppError.BadRequest('Erreur lors de la création du résultat', ErrorCodes.BAD_REQUEST);
  }
};

export const getResultById = async (id: string) => {
  const result = await prisma.exerciceResults.findUnique({
    where: { id },
    include: {
      exercice: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  if (!result) {
    throw AppError.NotFound('Résultat non trouvé', ErrorCodes.NOT_FOUND);
  }

  return result;
};

export const updateResult = async (id: string, data: UpdateResultData) => {
  try {
    await prisma.sets.deleteMany({
      where: { exerciceResultId: id }
    });

    return await prisma.exerciceResults.update({
      where: { id },
      data: {
        sets: {
          createMany: {
            data: data.sets.map(set => ({
              reps: set.reps,
              weight: set.weight
            }))
          }
        }
      },
      include: { sets: true }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Résultat non trouvé', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

export const deleteResult = async (id: string) => {
  try {
    return await prisma.exerciceResults.delete({
      where: { id }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Résultat non trouvé', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

export const deleteSet = async (resultId: string, setId: string) => {
  try {
    const result = await prisma.exerciceResults.findUnique({
      where: { id: resultId },
      include: { sets: true }
    });

    if (!result) {
      throw AppError.NotFound('Résultat non trouvé', ErrorCodes.NOT_FOUND);
    }

    await prisma.sets.delete({
      where: { id: setId }
    });

    if (result.sets.length === 1) {
      await prisma.exerciceResults.delete({
        where: { id: resultId }
      });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Série non trouvée', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};
