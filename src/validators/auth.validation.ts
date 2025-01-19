import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordErrorMessage = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';

export const loginSchema = z.object({
  body: z.object({
    pseudo: z.string().min(1, 'Pseudo requis'),
    password: z.string().min(1, 'Mot de passe requis')
  })
});

export const registerSchema = z.object({
  body: z
    .object({
      pseudo: z.string().min(1, 'Le pseudo est requis'),
      email: z.string().email('Email invalide'),
      password: z.string().regex(passwordRegex, passwordErrorMessage),
      confirmPassword: z.string().regex(passwordRegex, passwordErrorMessage)
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Les mots de passe ne correspondent pas',
      path: ['body', 'confirmPassword']
    })
});

export const resetPasswordRequestSchema = z.object({
  body: z.object({
    email: z.string().email('Email invalide')
  })
});

export const updatePasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token requis'),
    newPassword: z.string().regex(passwordRegex, passwordErrorMessage)
  })
});
