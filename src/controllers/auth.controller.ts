/**
 * @fileoverview Contrôleurs pour les opérations d'authentification
 * Gère les requêtes d'inscription, connexion et gestion des tokens
 */

import {NextFunction, Request, Response} from "express";
import prisma from "../database/db";
import {AppError, ErrorCodes} from "../errors/app.error";
import {
  createResetToken,
  createUser,
  FindRefreshToken,
  findResetToken,
  findUserAndValidate,
  saveRefreshToken,
  unvalidateRefreshToken,
} from "../services/auth.service";
import {sendResetPasswordEmail} from "../services/mail.service";
import {findUserByEmail, updateUser} from "../services/users.service";
import {hashPassword} from "../utils/hash";
import {createJWT, createRefreshToken} from "../utils/jwt";

/**
 * Gère l'inscription d'un nouvel utilisateur
 * @throws {AppError} Si la création échoue
 */
export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const newUser = await createUser(
      req.body.pseudo,
      req.body.password,
      req.body.email,
    );

    res.status(201).json({
      message: "Utilisateur créé avec succès.",
      data: { user: newUser },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Gère la connexion d'un utilisateur
 * @throws {AppError} Si l'authentification échoue
 */
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await findUserAndValidate(req.body.pseudo, req.body.password);
    const token = createJWT(user);
    const refreshToken = createRefreshToken(user);

    await saveRefreshToken(refreshToken, user.id);

    res.status(200).json({
      message: "Connexion réussie",
      data: {
        user: {
          id: user.id,
          pseudo: user.pseudo,
          email: user.email,
          onboardingStep: user.onboardingStep,
          isOnboardingCompleted: user.isOnboardingCompleted,
        },
        token: token,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Gère le rafraîchissement du token d'accès
 * @throws {AppError} Si le token est invalide
 */
export const getRefreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = req.refreshPayload;
    if (!user) {
      throw AppError.Unauthorized("Token invalide", ErrorCodes.INVALID_TOKEN);
    }

    const token = createJWT(user);
    const refreshToken = createRefreshToken(user);
    await saveRefreshToken(refreshToken, user.id);

    res.status(200).json({
      message: "Token renouvelé avec succès.",
      data: {
        token: token,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Gère l'invalidation d'un token de rafraîchissement
 * @throws {AppError} Si le token est introuvable
 */
export const unvalidateRefreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = await FindRefreshToken(req.params.id);

    if (!token) {
      throw AppError.NotFound("Token introuvable", ErrorCodes.NOT_FOUND);
    }

    await unvalidateRefreshToken(req.params.id);

    res.status(200).json({
      message: "Token invalidé avec succès",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Gère la demande de réinitialisation de mot de passe
 * @throws {AppError} Si une erreur survient lors de l'envoi de l'email
 */
export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    if (user) {
      const resetToken = await createResetToken(user.id);
      await sendResetPasswordEmail(email, resetToken.token);
    }

    res.status(200).json({
      message:
        "Si votre email existe dans notre base de données, vous recevrez un lien de réinitialisation.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Gère la mise à jour du mot de passe
 * @throws {AppError} Si le token ou le nouveau mot de passe est manquant
 */
export const updatePasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
    console.log("Données reçues : ", req.body);

    if (!token || !newPassword || !confirmPassword) {
      throw AppError.BadRequest(
        "Token et nouveau mot de passe requis",
        ErrorCodes.BAD_REQUEST,
      );
    }

    const resetToken = await findResetToken(token);

    const newPasswordHash = await hashPassword(newPassword);
    await updateUser(resetToken.userId, { passwordHash: newPasswordHash });

    await prisma.$transaction([
      prisma.refreshToken.updateMany({
        where: { userId: resetToken.userId },
        data: { isValid: false },
      }),
      prisma.passwordReset.delete({
        where: { id: resetToken.id },
      }),
    ]);

    res.status(200).json({
      message: "Mot de passe mis à jour avec succès",
    });
  } catch (error) {
    next(error);
  }
};
