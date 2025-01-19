/**
 * @fileoverview Schémas de validation pour les opérations sur les programmes d'entraînement
 * Utilise Zod pour valider les données des programmes
 */

import { z } from 'zod';

/**
 * Schéma de validation pour la création d'un programme
 * @type {z.ZodObject}
 */
export const createProgramSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom du programme est requis'),
    description: z.string().optional()
  })
});

/**
 * Schéma de validation pour la modification d'un programme
 * Inclut la validation de la position pour l'ordre d'affichage
 * @type {z.ZodObject}
 */
export const updateProgramSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom du programme ne peut être vide').optional(),
    description: z.string().optional(),
    position: z.number().int().optional()
  })
});
