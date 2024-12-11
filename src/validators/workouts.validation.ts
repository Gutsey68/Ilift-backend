import { z } from 'zod';

export const createWorkoutSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Le nom de la séance est requis'),
    programId: z.string().nonempty("L'identifiant du programme est requis")
  })
});

export const updateWorkoutSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Le nom de la séance est requis')
  }),
  params: z.object({
    id: z.string().nonempty("L'identifiant de la séance est requis")
  })
});

export const deleteWorkoutSchema = z.object({
  params: z.object({
    id: z.string().nonempty("L'identifiant de la séance est requis")
  })
});

export const getExercicesOfWorkoutSchema = z.object({
  params: z.object({
    id: z.string().nonempty("L'identifiant de la séance est requis")
  })
});
