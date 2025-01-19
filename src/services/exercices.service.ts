/**
 * @fileoverview Service de gestion des exercices
 * Fournit les fonctions CRUD et les requêtes spécialisées pour les exercices
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

/**
 * Récupère un exercice avec ses résultats pour un utilisateur
 * @returns {Promise<Exercice>} L'exercice et ses résultats
 * @throws {AppError} Si l'exercice n'est pas trouvé
 */
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

/**
 * Récupère un exercice par son identifiant
 * @returns {Promise<Workout>} L'exercice et son programme
 */
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

/**
 * Récupère un exercice par son identifiant sans ses résultats
 * @returns {Promise<Exercice>} L'exercice
 */
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

/**
 * Récupère tous les exercices
 * @returns {Promise<Exercice[]>} Liste des exercices
 */
export const getExercices = async () => {
  return await prisma.exercices.findMany();
};

/**
 * Crée un nouvel exercice
 * @param {Prisma.ExercicesCreateInput} data - Les données de l'exercice à créer
 * @returns {Promise<Exercice>} L'exercice créé
 * @throws {AppError} Si un exercice avec le même nom existe déjà
 */
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

/**
 * Met à jour un exercice
 * @param {string} id - L'identifiant de l'exercice à mettre à jour
 * @param {Prisma.ExercicesUpdateInput} data - Les nouvelles données de l'exercice
 * @returns {Promise<Exercice>} L'exercice mis à jour
 * @throws {AppError} Si l'exercice n'est pas trouvé
 */
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

/**
 * Supprime un exercice
 * @param {string} id - L'identifiant de l'exercice à supprimer
 * @returns {Promise<Exercice>} L'exercice supprimé
 * @throws {AppError} Si l'exercice n'est pas trouvé
 */
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

/**
 * Récupère tous les exercices avec leurs groupes musculaires
 * @returns {Promise<Exercice[]>} Liste des exercices triés par nom
 */
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

/**
 * Récupère les exercices d'une séance donnée
 * @returns {Promise<Exercice[]>} Liste des exercices avec leur position
 */
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
