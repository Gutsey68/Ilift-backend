import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    content: z.string().nonempty('Le contenu de la publication est requis')
  })
});

export const updatePostSchema = z.object({
  body: z.object({
    content: z.string().nonempty('Le contenu de la publication ne peut être vide')
  })
});

export const createCommentSchema = z.object({
  body: z.object({
    content: z.string().nonempty('Le contenu du commentaire est requis')
  })
});

export const updateCommentSchema = z.object({
  body: z.object({
    content: z.string().nonempty('Le contenu du commentaire ne peut être vide')
  })
});
