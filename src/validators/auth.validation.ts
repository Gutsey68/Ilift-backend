/**
 * @fileoverview Schémas de validation pour les opérations d'authentification
 * Utilise Zod pour valider les données d'authentification entrantes
 */

import {z} from "zod";

/**
 * Expression régulière pour la validation des mots de passe
 * Requiert 8 caractères minimum, une majuscule, une minuscule, un chiffre et un caractère spécial
 */
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordErrorMessage =
  "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial";

/**
 * Schéma de validation pour la connexion
 * @type {z.ZodObject}
 */
export const loginSchema = z.object({
  body: z.object({
    pseudo: z.string().min(1, "Pseudo requis"),
    password: z.string().min(1, "Mot de passe requis"),
  }),
});

/**
 * Schéma de validation pour l'inscription
 * Inclut la validation de la correspondance des mots de passe
 * @type {z.ZodObject}
 */
export const registerSchema = z.object({
  body: z
    .object({
      pseudo: z.string().min(1, "Le pseudo est requis"),
      email: z.string().email("Email invalide"),
      password: z.string().regex(passwordRegex, passwordErrorMessage),
      confirmPassword: z.string().regex(passwordRegex, passwordErrorMessage),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Les mots de passe ne correspondent pas",
      path: ["body", "confirmPassword"],
    }),
});

/**
 * Schéma de validation pour la demande de réinitialisation de mot de passe
 * @type {z.ZodObject}
 */
export const resetPasswordRequestSchema = z.object({
  body: z.object({
    email: z.string().email("Email invalide"),
  }),
});

/**
 * Schéma de validation pour la mise à jour du mot de passe
 * @type {z.ZodObject}
 */
export const updatePasswordSchema = z.object({
  body: z
    .object({
      token: z.string().min(1, "Token requis"),
      newPassword: z.string().regex(passwordRegex, passwordErrorMessage),
      confirmPassword: z.string().regex(passwordRegex, passwordErrorMessage),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Les mots de passe ne correspondent pas",
      path: ["confirmPassword"],
    }),
});
