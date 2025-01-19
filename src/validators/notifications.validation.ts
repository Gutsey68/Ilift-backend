/**
 * @fileoverview Schémas de validation pour les opérations sur les notifications
 * Utilise Zod pour valider les données des notifications
 */

import { z } from 'zod';

/**
 * Schéma de validation pour la création d'une notification
 * @type {z.ZodObject}
 */
export const createNotificationSchema = z.object({
  body: z.object({
    type: z.string().min(1, 'Le type de notification est requis'),
    content: z.string().min(1, 'Le contenu de la notification est requis')
  })
});

/**
 * Schéma de validation pour la modification d'une notification
 * @type {z.ZodObject}
 */
export const updateNotificationSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Le contenu de la notification est requis')
  }),
  params: z.object({
    id: z.string().min(1, "L'identifiant de la notification est requis")
  })
});

/**
 * Schéma de validation pour la suppression d'une notification
 * @type {z.ZodObject}
 */
export const deleteNotificationSchema = z.object({
  params: z.object({
    id: z.string().min(1, "L'identifiant de la notification est requis")
  })
});
