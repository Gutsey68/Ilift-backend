/**
 * @fileoverview Service de gestion de l'authentification
 * Fournit les fonctions pour la création et la gestion des utilisateurs et des tokens
 */

import {Prisma} from "@prisma/client";
import crypto from "crypto";
import prisma from "../database/db";
import {AppError, ErrorCodes} from "../errors/app.error";
import {comparePasswords, hashPassword} from "../utils/hash";

/**
 * Crée un nouvel utilisateur
 * @throws {AppError} Si le pseudo ou l'email existe déjà
 */
export const createUser = async (
  pseudo: string,
  password: string,
  email: string,
) => {
  const existingPseudo = await prisma.user.findUnique({ where: { pseudo } });
  if (existingPseudo) {
    throw AppError.Conflict(
      "Ce pseudo est déjà utilisé",
      ErrorCodes.DUPLICATE_PSEUDO,
    );
  }

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    throw AppError.Conflict(
      "Cet email est déjà utilisé",
      ErrorCodes.DUPLICATE_EMAIL,
    );
  }

  const passwordHash = await hashPassword(password);
  return await prisma.user.create({
    data: { pseudo, passwordHash, email },
  });
};

/**
 * Sauvegarde un token de rafraîchissement
 * @throws {AppError} En cas d'erreur de sauvegarde
 */
export const saveRefreshToken = async (token: string, userId: string) => {
  try {
    await prisma.refreshToken.updateMany({
      where: { userId, isValid: true },
      data: { isValid: false },
    });

    const cleanToken = token.replace("Bearer ", "").trim();
    return await prisma.refreshToken.create({
      data: {
        token: cleanToken,
        userId,
        isValid: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw AppError.BadRequest(
        "Erreur lors de la sauvegarde du token",
        ErrorCodes.INTERNAL_ERROR,
      );
    }
    throw error;
  }
};

/**
 * Recherche un token de rafraîchissement par ID utilisateur
 * @throws {AppError} Si le token n'est pas trouvé
 */
export const findRefreshTokenByUserId = async (userId: string) => {
  const token = await prisma.refreshToken.findFirst({
    where: { userId, isValid: true },
  });

  if (!token) {
    throw AppError.NotFound(
      "Token de rafraîchissement non trouvé",
      ErrorCodes.INVALID_TOKEN,
    );
  }

  return token;
};

/**
 * Invalide un token de rafraîchissement
 */
export const unvalidateRefreshToken = async (token: string) => {
  return await prisma.refreshToken.updateMany({
    data: {
      isValid: false,
    },
    where: {
      token,
    },
  });
};

/**
 * Trouve un token de rafraîchissement valide
 */
export const FindRefreshToken = async (token: string) => {
  const cleanToken = token?.replace(/^Bearer\s+/i, "").trim() || "";
  return await prisma.refreshToken.findFirst({
    where: {
      token: cleanToken,
      isValid: true,
    },
  });
};

/**
 * Crée un token de réinitialisation de mot de passe
 * @throws {AppError} Si une demande est déjà en cours
 */
export const createResetToken = async (userId: string) => {
  try {
    const existingToken = await prisma.passwordReset.findFirst({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
    });

    if (existingToken) {
      throw AppError.Conflict(
        "Une demande de réinitialisation est déjà en cours",
        ErrorCodes.DUPLICATE_ENTRY,
      );
    }

    return await prisma.passwordReset.create({
      data: {
        userId,
        token: crypto.randomBytes(32).toString("hex"),
        expiresAt: new Date(Date.now() + 3600000),
      },
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw AppError.BadRequest(
      "Erreur lors de la création du token de réinitialisation",
      ErrorCodes.INTERNAL_ERROR,
    );
  }
};

/**
 * Trouve un token de réinitialisation valide
 */
export const findResetToken = async (token: string) => {
  return await prisma.passwordReset.findFirst({
    where: {
      token,
      expiresAt: {
        gt: new Date(),
      },
    },
  });
};

/**
 * Trouve et valide un utilisateur avec ses identifiants
 * @throws {AppError} Si les identifiants sont invalides ou le compte banni
 */
export const findUserAndValidate = async (pseudo: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { pseudo } });

  if (!user) {
    throw AppError.Unauthorized(
      "Identifiants incorrects",
      ErrorCodes.INVALID_CREDENTIALS,
    );
  }

  if (user.isBan) {
    throw AppError.Forbidden(
      "Votre compte a été banni",
      ErrorCodes.USER_BANNED,
    );
  }

  const isValid = await comparePasswords(password, user.passwordHash);
  if (!isValid) {
    throw AppError.Unauthorized(
      "Identifiants incorrects",
      ErrorCodes.INVALID_CREDENTIALS,
    );
  }

  return user;
};
