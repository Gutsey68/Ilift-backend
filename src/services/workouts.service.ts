/**
 * @fileoverview Service de gestion des séances d'entraînement
 * Fournit les fonctions CRUD et spécialisées pour les séances
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';
import { UpdateWorkoutData } from '../types/workout.types';

/**
 * Récupère une séance par son identifiant
 * @param {string} id - Identifiant de la séance
 * @throws {AppError} Si la séance n'est pas trouvée
 */
export const getWorkoutById = async (id: string) => {
  const workout = await prisma.workouts.findUnique({
    where: { id },
    select: {
      name: true,
      id: true,
      program: {
        select: {
          name: true,
          id: true
        }
      }
    }
  });

  if (!workout) {
    throw AppError.NotFound('Séance non trouvée', ErrorCodes.WORKOUT_NOT_FOUND);
  }

  return workout;
};

/**
 * Récupère une séance par son identifiant sans sélection
 * @param {string} id - Identifiant de la séance
 */
export const getWorkoutByIdWithoutSelect = async (id: string) => {
  return await prisma.workouts.findUnique({
    where: {
      id
    },
    select: {
      id: true
    }
  });
};

/**
 * Récupère les exercices d'une séance
 * @param {string} workoutId - Identifiant de la séance
 * @throws {AppError} Si la séance n'est pas trouvée
 */
export const getExercicesOfWorkout = async (workoutId: string) => {
  const workout = await prisma.workouts.findUnique({
    where: { id: workoutId },
    select: {
      id: true,
      name: true,
      program: {
        select: {
          id: true,
          name: true
        }
      },
      exercices: {
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
      }
    }
  });

  if (!workout) {
    throw AppError.NotFound('Séance non trouvée', ErrorCodes.WORKOUT_NOT_FOUND);
  }

  return {
    workout: {
      id: workout.id,
      name: workout.name,
      program: workout.program
    },
    exercices: workout.exercices.map(we => ({
      ...we.exercice,
      position: we.position
    }))
  };
};

/**
 * Crée une nouvelle séance
 * @param {string} name - Nom de la séance
 * @param {string} programId - Identifiant du programme
 * @param {string} userId - Identifiant de l'utilisateur
 * @throws {AppError} Si le programme est invalide
 */
export const createWorkout = async (name: string, programId: string, userId: string) => {
  try {
    const maxPosition = await prisma.workouts.aggregate({
      where: { programId },
      _max: { position: true }
    });

    const position = (maxPosition._max.position || 0) + 1;

    return await prisma.workouts.create({
      data: { name, programId, userId, position }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        throw AppError.BadRequest('Programme invalide', ErrorCodes.PROGRAM_NOT_FOUND);
      }
    }
    throw error;
  }
};

/**
 * Met à jour une séance
 * @param {string} id - Identifiant de la séance
 * @param {UpdateWorkoutData} data - Données de mise à jour
 * @throws {AppError} Si la séance n'est pas trouvée
 */
export const updateWorkout = async (id: string, data: UpdateWorkoutData) => {
  try {
    return await prisma.workouts.update({
      where: { id },
      data
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Séance non trouvée', ErrorCodes.WORKOUT_NOT_FOUND);
      }
    }
    throw error;
  }
};

/**
 * Supprime une séance
 * @param {string} id - Identifiant de la séance
 * @throws {AppError} Si la séance n'est pas trouvée
 */
export const deleteWorkout = async (id: string) => {
  try {
    return await prisma.workouts.delete({
      where: { id }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Séance non trouvée', ErrorCodes.WORKOUT_NOT_FOUND);
      }
    }
    throw error;
  }
};

/**
 * Met à jour les exercices d'une séance
 * @param {string} workoutId - Identifiant de la séance
 * @param {string[]} exerciceIds - Liste des identifiants des exercices
 * @throws {AppError} Si une erreur se produit lors de la mise à jour
 */
export const updateWorkoutExercices = async (workoutId: string, exerciceIds: string[]) => {
  try {
    await prisma.workoutsExercises.deleteMany({
      where: { workoutId }
    });

    await prisma.workoutsExercises.createMany({
      data: exerciceIds.map((exerciceId, index) => ({
        workoutId,
        exerciceId,
        position: index + 1
      }))
    });

    return await prisma.exercices.findMany({
      where: {
        workouts: {
          some: { workoutId }
        }
      },
      include: {
        musclesGroups: {
          include: {
            muscleGroups: true
          }
        }
      },
      orderBy: { position: 'asc' }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw AppError.BadRequest('Erreur lors de la mise à jour des exercices', ErrorCodes.BAD_REQUEST);
    }
    throw error;
  }
};
