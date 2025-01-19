/**
 * @fileoverview Service de gestion des programmes d'entraînement
 * Fournit les fonctions CRUD et les requêtes spécialisées pour les programmes
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';
import { UpdateProgramData } from '../types/programs.types';

/**
 * Récupère tous les programmes
 * @throws {AppError} Si aucun programme n'est trouvé
 */
export const getPrograms = async () => {
  const programs = await prisma.programs.findMany();
  if (!programs.length) {
    throw AppError.NotFound('Aucun programme trouvé', ErrorCodes.PROGRAM_NOT_FOUND);
  }
  return programs;
};

/**
 * Récupère les programmes d'un utilisateur
 * @param {string} authorId - Identifiant de l'auteur
 * @throws {AppError} Si aucun programme n'est trouvé
 */
export const getProgramsOfUser = async (authorId: string) => {
  const programs = await prisma.programs.findMany({
    where: { authorId },
    orderBy: { position: 'asc' }
  });

  if (!programs.length) {
    throw AppError.NotFound('Aucun programme trouvé pour cet utilisateur', ErrorCodes.PROGRAM_NOT_FOUND);
  }
  return programs;
};

/**
 * Récupère un programme par son identifiant
 * @param {string} id - Identifiant du programme
 * @throws {AppError} Si le programme n'est pas trouvé
 */
export const getProgramById = async (id: string) => {
  const program = await prisma.programs.findUnique({
    where: { id },
    select: {
      name: true,
      id: true,
      author: { select: { id: true } },
      usersFollows: { select: { userId: true } }
    }
  });

  if (!program) {
    throw AppError.NotFound('Programme non trouvé', ErrorCodes.PROGRAM_NOT_FOUND);
  }
  return program;
};

/**
 * Récupère les séances d'entraînement d'un programme
 * @param {string} programId - Identifiant du programme
 * @returns {Promise<Array>} - Liste des séances d'entraînement
 */
export const getWorkoutsOfProgram = async (programId: string) => {
  return await prisma.workouts.findMany({
    where: {
      programId
    },
    orderBy: {
      position: 'asc'
    }
  });
};

/**
 * Crée un nouveau programme
 * @param {string} name - Nom du programme
 * @param {string} description - Description du programme
 * @param {string} authorId - Identifiant de l'auteur
 * @returns {Promise<Object>} - Programme créé
 * @throws {AppError} Si une erreur survient lors de la création
 */
export const createProgram = async (name: string, description: string, authorId: string) => {
  try {
    const maxPosition = await prisma.programs.aggregate({
      where: { authorId },
      _max: { position: true }
    });

    const position = (maxPosition._max.position || 0) + 1;

    return await prisma.programs.create({
      data: { name, description, authorId, position }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw AppError.BadRequest('Erreur lors de la création du programme', ErrorCodes.BAD_REQUEST);
    }
    throw error;
  }
};

/**
 * Met à jour un programme
 * @param {string} id - Identifiant du programme
 * @param {UpdateProgramData} data - Données de mise à jour
 * @returns {Promise<Object>} - Programme mis à jour
 * @throws {AppError} Si le programme n'est pas trouvé
 */
export const updateProgram = async (id: string, data: UpdateProgramData) => {
  try {
    return await prisma.programs.update({
      where: { id },
      data
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Programme non trouvé', ErrorCodes.PROGRAM_NOT_FOUND);
      }
    }
    throw error;
  }
};

/**
 * Supprime un programme
 * @param {string} id - Identifiant du programme
 * @returns {Promise<Object>} - Programme supprimé
 * @throws {AppError} Si le programme n'est pas trouvé
 */
export const deleteProgram = async (id: string) => {
  try {
    return await prisma.programs.delete({
      where: { id }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Programme non trouvé', ErrorCodes.PROGRAM_NOT_FOUND);
      }
    }
    throw error;
  }
};
