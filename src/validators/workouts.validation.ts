/**
 * @fileoverview Schémas de validation pour les opérations sur les séances d'entraînement
 * Utilise Zod pour valider les données des séances et leurs exercices
 */

import { z } from 'zod';

/**
 * Schéma de validation pour la création d'une séance
 * @type {z.ZodObject}
 */
export const createWorkoutSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom de la séance est requis'),
    programId: z.string().min(1, "L'identifiant du programme est requis")
  })
});

/**
 * Schéma de validation pour la modification d'une séance
 * Inclut la validation de la position pour l'ordre d'affichage
 * @type {z.ZodObject}
 */
export const updateWorkoutSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom de la séance est requis').optional(),
    position: z.number().int().optional()
  }),
  params: z.object({
    id: z.string().min(1, "L'identifiant de la séance est requis")
  })
});

/**
 * Schéma de validation pour la suppression d'une séance
 * @type {z.ZodObject}
 */
export const deleteWorkoutSchema = z.object({
  params: z.object({
    id: z.string().min(1, "L'identifiant de la séance est requis")
  })
});

/**
 * Schéma de validation pour la récupération des exercices d'une séance
 * @type {z.ZodObject}
 */
export const getExercicesOfWorkoutSchema = z.object({
  params: z.object({
    id: z.string().min(1, "L'identifiant de la séance est requis")
  })
});

/**
 * Schéma de validation pour la mise à jour des exercices d'une séance
 * @type {z.ZodObject}
 */
export const updateWorkoutExercicesSchema = z.object({
  body: z.object({
    exerciceIds: z.array(z.string())
  }),
  params: z.object({
    id: z.string().min(1, "L'identifiant de la séance est requis")
  })
});
