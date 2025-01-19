/**
 * @fileoverview Schémas de validation pour les opérations sur les tags
 * Utilise Zod pour valider les données des tags
 */

import { z } from 'zod';

/**
 * Schéma de validation pour la création d'un tag
 * @type {z.ZodObject}
 */
export const createTagSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom du tag est requis')
  })
});

/**
 * Schéma de validation pour la modification d'un tag
 * @type {z.ZodObject}
 */
export const updateTagSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom du tag est requis')
  }),
  params: z.object({
    id: z.string().min(1, "L'identifiant du tag est requis")
  })
});

/**
 * Schéma de validation pour la suppression d'un tag
 * @type {z.ZodObject}
 */
export const deleteTagSchema = z.object({
  params: z.object({
    id: z.string().min(1, "L'identifiant du tag est requis")
  })
});
