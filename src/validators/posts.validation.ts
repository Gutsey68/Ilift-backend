import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Le contenu de la publication est requis'),
    photo: z.string().optional(),
    tags: z.string().optional(),
    exerciseResults: z.string().optional()
  })
});

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

export const createCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Le contenu du commentaire est requis')
  })
});

export const updateCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Le contenu du commentaire ne peut être vide')
  })
});
