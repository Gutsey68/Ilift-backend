import { z } from 'zod';
import prisma from '../database/db';
import { createResetToken, createUser, FindRefreshToken, findResetToken, saveRefreshToken, unvalidateRefreshToken } from '../services/auth.service';
import { sendResetPasswordEmail } from '../services/mail.service';
import { findUserByEmail, findUserByPseudo, updateUser } from '../services/users.service';
import { comparePasswords, hashPassword } from '../utils/hash';
import { createJWT, createRefreshToken } from '../utils/jwt';

export const registerHandler = async (req, res) => {
  try {
    const existingPseudo = await findUserByPseudo(req.body.pseudo);

    if (existingPseudo) {
      return res.status(400).json({ error: 'Ce pseudo est déjà utilisé.' });
    }

    const existingEmail = await findUserByEmail(req.body.email);

    if (existingEmail) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    const newUser = await createUser(req.body.pseudo, req.body.password, req.body.email);

    if (!newUser) {
      return res.status(400).json({ error: "Erreur lors de la création de l'utilisateur" });
    }

    res.status(201).json({ message: 'Utilisateur créé avec succès.', data: { user: newUser } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const loginHandler = async (req, res) => {
  try {
    const user = await findUserByPseudo(req.body.pseudo);

    if (!user) {
      return res.status(401).json({ error: 'Pseudo ou mot de passe incorrect' });
    }

    const isValid = await comparePasswords(req.body.password, user.passwordHash);

    if (!isValid) {
      return res.status(401).json({ error: 'Pseudo ou mot de passe incorrect' });
    }

    const token = createJWT(user);

    if (!token) {
      return res.status(400).json({ error: 'Erreur lors de la génération du token' });
    }

    const refreshToken = createRefreshToken(user);

    if (!refreshToken) {
      return res.status(400).json({ error: 'Erreur lors de la génération du token' });
    }

    const savedRefreshToken = await saveRefreshToken(refreshToken, user.id);

    if (!savedRefreshToken) {
      return res.status(400).json({ error: 'Erreur lors de la sauvegarde du token' });
    }

    res.status(200).json({
      message: 'Connexion réussie',
      data: {
        user: { id: user.id, pseudo: user.pseudo, email: user.email }
      },
      token,
      refreshToken
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getRefreshTokenHandler = async (req, res) => {
  try {
    const user = req.refreshPayload;

    const token = createJWT(user);
    const refreshToken = createRefreshToken(user);

    if (!token) {
      return res.status(400).json({ error: 'Erreur lors de la génération du token' });
    }

    if (!refreshToken) {
      return res.status(400).json({ error: 'Erreur lors de la génération du token' });
    }

    const savedRefreshToken = await saveRefreshToken(refreshToken, user.id);

    if (!savedRefreshToken) {
      return res.status(400).json({ error: 'Erreur lors de la sauvegarde du token' });
    }

    res.status(200).json({
      message: 'Token renouvelé avec succès.',
      data: {
        token,
        refreshToken
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Échec du rafraîchissement du token.' });
  }
};

export const unvalidateRefreshTokenHandler = async (req, res) => {
  try {
    const token = await FindRefreshToken(req.params.id);

    if (!token) {
      return res.status(404).json({ error: 'Token introuvable' });
    }

    const unvalidToken = await unvalidateRefreshToken(req.params.id);

    if (!unvalidToken) {
      return res.status(400).json({ error: "Erreur lors de l'invalidation du token" });
    }

    res.status(200).json({ message: 'Token invalidé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const resetPasswordHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      // Retourner le même message même si l'utilisateur n'existe pas pour des raisons de sécurité
      return res.status(200).json({ message: 'Si votre email existe dans notre base de données, vous recevrez un lien de réinitialisation.' });
    }

    const resetToken = await createResetToken(user.id);
    await sendResetPasswordEmail(email, resetToken.token);

    res.status(200).json({
      message: 'Si votre email existe dans notre base de données, vous recevrez un lien de réinitialisation.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la réinitialisation du mot de passe' });
  }
};

export const updatePasswordHandler = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const resetToken = await findResetToken(token);

    if (!resetToken) {
      return res.status(400).json({ error: 'Token invalide ou expiré' });
    }

    const newPasswordHash = await hashPassword(newPassword);
    // Utiliser updateUser au lieu de updateUserPassword
    await updateUser(resetToken.userId, { passwordHash: newPasswordHash });

    // Invalider tous les refresh tokens de l'utilisateur
    await prisma.refreshToken.updateMany({
      where: { userId: resetToken.userId },
      data: { isValid: false }
    });

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe' });
  }
};
