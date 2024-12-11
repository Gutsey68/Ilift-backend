import { z } from 'zod';

export const createTagSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Le nom du tag est requis')
  })
});

export const updateTagSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Le nom du tag est requis')
  }),
  params: z.object({
    id: z.string().nonempty("L'identifiant du tag est requis")
  })
});

export const deleteTagSchema = z.object({
  params: z.object({
    id: z.string().nonempty("L'identifiant du tag est requis")
  })
});
