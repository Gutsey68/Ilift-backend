import { z } from 'zod';

export const createProgramSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom du programme est requis'),
    description: z.string().optional()
  })
});

export const updateProgramSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom du programme ne peut être vide').optional(),
    description: z.string().optional(),
    position: z.number().int().optional()
  })
});
