/**
 * @fileoverview Schémas de validation pour les opérations sur les exercices
 * Utilise Zod pour valider les données des exercices
 */

import { z } from 'zod';

/**
 * Schéma de validation pour la création d'un exercice
 * @type {z.ZodObject}
 */
export const createExerciceSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Le nom de l'exercice est requis")
  })
});

/**
 * Schéma de validation pour la modification d'un exercice
 * @type {z.ZodObject}
 */
export const updateExerciceSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Le nom de l'exercice ne peut être vide")
  })
});
