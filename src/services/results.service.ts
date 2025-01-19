/**
 * @fileoverview Service de gestion des résultats d'exercices
 * Fournit les fonctions CRUD pour les résultats et leurs séries
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';
import { CreateResultData, UpdateResultData } from '../types/result.types';

/**
 * Crée un nouveau résultat d'exercice avec ses séries
 * @param {CreateResultData} data - Données du résultat à créer
 * @param {string} userId - Identifiant de l'utilisateur
 * @throws {AppError} Si l'exercice n'existe pas ou si la création échoue
 */
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

/**
 * Récupère un résultat d'exercice par son identifiant
 * @param {string} id - Identifiant du résultat
 * @returns {Promise<Object>} Le résultat trouvé
 * @throws {AppError} Si le résultat n'existe pas
 */
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

/**
 * Met à jour un résultat d'exercice et ses séries
 * @param {string} id - Identifiant du résultat
 * @param {UpdateResultData} data - Données de mise à jour
 * @returns {Promise<Object>} Le résultat mis à jour
 * @throws {AppError} Si le résultat n'existe pas ou si la mise à jour échoue
 */
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

/**
 * Supprime un résultat d'exercice par son identifiant
 * @param {string} id - Identifiant du résultat
 * @returns {Promise<Object>} Le résultat supprimé
 * @throws {AppError} Si le résultat n'existe pas ou si la suppression échoue
 */
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

/**
 * Supprime une série d'un résultat d'exercice
 * @param {string} resultId - Identifiant du résultat
 * @param {string} setId - Identifiant de la série
 * @throws {AppError} Si le résultat ou la série n'existe pas ou si la suppression échoue
 */
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
