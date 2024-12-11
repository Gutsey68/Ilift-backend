import { z } from 'zod';

export const loginSchema = z.object({
  pseudo: z.string().min(1, 'Le pseudo est requis'),
  password: z.string().min(3, 'Le mot de passe doit comporter au moins 3 caractères')
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email invalide')
});

export const registerSchema = z
  .object({
    pseudo: z.string().min(1, 'Le pseudo est requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(3, 'Le mot de passe doit comporter au moins 3 caractères'),
    confirmPassword: z.string().min(1, 'La confirmation du mot de passe est requise')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword']
  });

export const postSchema = z.object({
  content: z.string().min(1, 'Le contenu est requis')
});
