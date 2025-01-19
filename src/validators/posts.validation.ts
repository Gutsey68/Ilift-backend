/**
 * @fileoverview Schémas de validation pour les publications et commentaires
 * Utilise Zod pour valider les données des posts et leurs commentaires
 */

import { z } from 'zod';

/**
 * Schéma de validation pour la création d'une publication
 * @type {z.ZodObject}
 */
export const createPostSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Le contenu de la publication est requis'),
    photo: z.string().optional(),
    tags: z.string().optional(),
    exerciseResults: z.string().optional()
  })
});

/**
 * Schéma de validation pour la modification d'une publication
 * Permet la mise à jour partielle et la gestion des médias
 * @type {z.ZodObject}
 */
export const updatePostSchema = z.object({
  body: z.object({
    content: z.string().optional(),
    photo: z.string().nullable().optional(),
    isValid: z.boolean().optional(),
    tags: z.string().nullable().optional(),
    removePhoto: z.union([z.literal('true'), z.literal('false'), z.boolean()]).optional(),
    removeTags: z.union([z.literal('true'), z.literal('false'), z.boolean()]).optional()
  })
});

/**
 * Schéma de validation pour la création d'un commentaire
 * @type {z.ZodObject}
 */
export const createCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Le contenu du commentaire est requis')
  })
});

/**
 * Schéma de validation pour la modification d'un commentaire
 * @type {z.ZodObject}
 */
export const updateCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Le contenu du commentaire ne peut être vide')
  })
});
