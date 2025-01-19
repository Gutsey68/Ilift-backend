/**
 * @fileoverview Schémas de validation pour les résultats d'exercices
 * Utilise Zod pour valider les données des séries et répétitions
 */

import { z } from 'zod';

/**
 * Schéma de validation pour une série d'exercice
 * Définit la structure d'une série avec répétitions et poids
 * @type {z.ZodObject}
 */
const setSchema = z.object({
  reps: z.number().min(0, 'Le nombre de répétitions ne peut pas être négatif'),
  weight: z.number().min(0, 'Le poids ne peut pas être négatif')
});

/**
 * Schéma de validation pour la création d'un résultat d'exercice
 * @type {z.ZodObject}
 */
export const createResultSchema = z.object({
  body: z.object({
    exerciceId: z.string(),
    sets: z.array(setSchema).min(1, 'Au moins une série est requise')
  })
});

/**
 * Schéma de validation pour la modification d'un résultat d'exercice
 * @type {z.ZodObject}
 */
export const updateResultSchema = z.object({
  body: z.object({
    sets: z.array(setSchema).min(1, 'Au moins une série est requise')
  })
});
