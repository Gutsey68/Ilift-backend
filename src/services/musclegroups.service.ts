/**
 * @fileoverview Service de gestion des groupes musculaires
 * Fournit les fonctions pour accéder aux données des groupes musculaires
 */

import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

/**
 * Récupère tous les groupes musculaires
 * @returns {Promise<MuscleGroup[]>} Liste des groupes musculaires triés par nom
 * @throws {AppError} Si aucun groupe musculaire n'est trouvé
 */
export const getAllMuscleGroups = async () => {
  const muscleGroups = await prisma.muscleGroups.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  if (!muscleGroups.length) {
    throw AppError.NotFound('Aucun groupe musculaire trouvé', ErrorCodes.NOT_FOUND);
  }

  return muscleGroups;
};
