/**
 * @fileoverview Service de gestion des villes
 * Fournit les fonctions pour la recherche des villes
 */

import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

/**
 * Recherche une ville par son nom
 * @param {string} name - Nom de la ville à rechercher
 * @returns {Promise<{id: string, name: string}>} Ville trouvée
 * @throws {AppError} Si la ville n'est pas trouvée
 */
export const findCityByName = async (name: string) => {
  const city = await prisma.city.findFirst({
    where: { name },
    select: {
      id: true,
      name: true
    }
  });

  if (!city) {
    throw AppError.NotFound('Ville non trouvée', ErrorCodes.NOT_FOUND);
  }

  return city;
};
