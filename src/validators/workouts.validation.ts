import { z } from 'zod';

export const createWorkoutSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom de la séance est requis'),
    programId: z.string().min(1, "L'identifiant du programme est requis")
  })
});

export const updateWorkoutSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Le nom de la séance est requis')
  }),
  params: z.object({
    id: z.string().min(1, "L'identifiant de la séance est requis")
  })
});

export const deleteWorkoutSchema = z.object({
  params: z.object({
    id: z.string().min(1, "L'identifiant de la séance est requis")
  })
});

export const getExercicesOfWorkoutSchema = z.object({
  params: z.object({
    id: z.string().min(1, "L'identifiant de la séance est requis")
  })
});

export const updateWorkoutExercicesSchema = z.object({
  body: z.object({
    exerciceIds: z.array(z.string())
  }),
  params: z.object({
    id: z.string().min(1, "L'identifiant de la séance est requis")
  })
});
