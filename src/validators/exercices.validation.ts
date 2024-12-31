import { z } from 'zod';

export const createExerciceSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Le nom de l'exercice est requis")
  })
});

export const updateExerciceSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Le nom de l'exercice ne peut être vide")
  })
});
