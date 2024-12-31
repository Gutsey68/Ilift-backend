import { z } from 'zod';

const setSchema = z.object({
  reps: z.number().min(0, 'Le nombre de répétitions ne peut pas être négatif'),
  weight: z.number().min(0, 'Le poids ne peut pas être négatif')
});

export const createResultSchema = z.object({
  body: z.object({
    exerciceId: z.string(),
    sets: z.array(setSchema).min(1, 'Au moins une série est requise')
  })
});

export const updateResultSchema = z.object({
  body: z.object({
    sets: z.array(setSchema).min(1, 'Au moins une série est requise')
  })
});
