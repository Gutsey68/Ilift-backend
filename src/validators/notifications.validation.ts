import { z } from 'zod';

export const createNotificationSchema = z.object({
  body: z.object({
    type: z.string().nonempty('Le type de notification est requis'),
    content: z.string().nonempty('Le contenu de la notification est requis')
  })
});

export const updateNotificationSchema = z.object({
  body: z.object({
    content: z.string().nonempty('Le contenu de la notification est requis')
  }),
  params: z.object({
    id: z.string().nonempty("L'identifiant de la notification est requis")
  })
});

export const deleteNotificationSchema = z.object({
  params: z.object({
    id: z.string().nonempty("L'identifiant de la notification est requis")
  })
});
