import { z } from 'zod';

export const createProgramSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Le nom du programme est requis'),
    description: z.string().nonempty('La déscription du programme est requise')
  })
});

export const updateProgramSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Le nom du programme ne peut être vide'),
    description: z.string().nonempty('La déscription du programme ne peut être vide')
  })
});
