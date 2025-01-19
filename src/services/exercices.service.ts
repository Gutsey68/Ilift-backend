import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

export const getExerciceAndResults = async (id: string, userId: string) => {
  const exercice = await prisma.exercices.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      results: {
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
          exercice: {
            select: {
              id: true,
              name: true
            }
          },
          sets: {
            orderBy: { createdAt: 'asc' }
          }
        }
      }
    }
  });

  if (!exercice) {
    throw AppError.NotFound('Exercice non trouvé', ErrorCodes.NOT_FOUND);
  }

  return exercice;
};

export const getWorkoutById = async (id: string) => {
  return await prisma.workoutsExercises.findFirst({
    where: {
      exerciceId: id
    },
    select: {
      exercice: {
        select: {
          id: true,
          name: true
        }
      },
      workout: {
        select: {
          id: true,
          name: true,
          program: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });
};

export const getExerciceByIdWithoutResults = async (id: string) => {
  return await prisma.exercices.findUnique({
    where: {
      id
    },
    select: {
      id: true
    }
  });
};

export const getExercices = async () => {
  return await prisma.exercices.findMany();
};

export const createExercice = async (data: Prisma.ExercicesCreateInput) => {
  try {
    return await prisma.exercices.create({ data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw AppError.Conflict('Un exercice avec ce nom existe déjà', ErrorCodes.DUPLICATE_ENTRY);
      }
    }
    throw error;
  }
};

export const updateExercice = async (id: string, data: Prisma.ExercicesUpdateInput) => {
  try {
    return await prisma.exercices.update({
      where: { id },
      data
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Exercice non trouvé', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

export const deleteExercice = async (id: string) => {
  try {
    return await prisma.exercices.delete({
      where: { id }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Exercice non trouvé', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

export const getAllExercices = async () => {
  return await prisma.exercices.findMany({
    include: {
      musclesGroups: {
        include: {
          muscleGroups: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  });
};

export const getExercicesOfWorkout = async (workoutId: string) => {
  const workoutExercices = await prisma.workoutsExercises.findMany({
    where: { workoutId },
    include: {
      exercice: {
        include: {
          musclesGroups: {
            include: {
              muscleGroups: true
            }
          }
        }
      }
    },
    orderBy: {
      position: 'asc'
    }
  });

  return workoutExercices.map(we => ({
    ...we.exercice,
    position: we.position
  }));
};
