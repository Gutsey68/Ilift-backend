/**
 * @fileoverview Service de gestion des tags
 * Fournit les fonctions CRUD pour les tags de publications
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

/**
 * Récupère les 10 premiers tags
 * @throws {AppError} Si aucun tag n'est trouvé
 */
export const getTags = async () => {
  const tags = await prisma.tags.findMany({
    take: 10
  });

  if (!tags.length) {
    throw AppError.NotFound('Aucun tag trouvé', ErrorCodes.NOT_FOUND);
  }

  return tags;
};

/**
 * Recherche un tag par son nom
 * @param {string} name - Nom du tag à rechercher
 */
export const getTagByName = async (name: string) => {
  const tag = await prisma.tags.findFirst({
    where: { name }
  });
  return tag;
};

/**
 * Recherche un tag par son identifiant
 * @param {string} id - Identifiant du tag à rechercher
 * @throws {AppError} Si le tag n'est pas trouvé
 */
export const getTagById = async (id: string) => {
  const tag = await prisma.tags.findFirst({
    where: { id }
  });

  if (!tag) {
    throw AppError.NotFound('Tag non trouvé', ErrorCodes.NOT_FOUND);
  }

  return tag;
};

/**
 * Crée un nouveau tag
 * @param {string} name - Nom du tag à créer
 * @throws {AppError} Si le tag existe déjà
 */
export const createTag = async (name: string) => {
  try {
    return await prisma.tags.create({
      data: { name }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw AppError.Conflict('Ce tag existe déjà', ErrorCodes.DUPLICATE_ENTRY);
      }
    }
    throw error;
  }
};

/**
 * Met à jour un tag existant
 * @param {string} id - Identifiant du tag à mettre à jour
 * @param {string} name - Nouveau nom du tag
 * @throws {AppError} Si le tag existe déjà ou n'est pas trouvé
 */
export const updateTag = async (id: string, name: string) => {
  try {
    return await prisma.tags.update({
      where: { id },
      data: { name }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw AppError.Conflict('Ce tag existe déjà', ErrorCodes.DUPLICATE_ENTRY);
      }
      if (error.code === 'P2025') {
        throw AppError.NotFound('Tag non trouvé', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

/**
 * Supprime un tag
 * @param {string} id - Identifiant du tag à supprimer
 * @throws {AppError} Si le tag n'est pas trouvé
 */
export const deleteTag = async (id: string) => {
  try {
    return await prisma.tags.delete({
      where: { id }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Tag non trouvé', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};
