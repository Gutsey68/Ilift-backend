import prisma from '../database/db';
import { comparePasswords, createJWT, hashPassword, logout } from '../services/auth.service';

export const createNewUser = async (req, res) => {
  try {
    const existingPseudo = await prisma.user.findUnique({
      where: { pseudo: req.body.pseudo }
    });
    if (existingPseudo) {
      return res.status(400).json({ error: 'Ce pseudo est déjà utilisé.' });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email: req.body.email }
    });
    if (existingEmail) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    const hash = await hashPassword(req.body.password);
    const user = await prisma.user.create({
      data: {
        pseudo: req.body.pseudo,
        passwordHash: hash,
        email: req.body.email
      }
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur.' });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { pseudo: req.body.pseudo }
    });

    if (!user) {
      return res.status(401).json({ error: 'Pseudo ou mot de passe incorrect' });
    }

    const isValid = await comparePasswords(req.body.password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Pseudo ou mot de passe incorrect' });
    }

    const token = createJWT(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    res.status(200).json({ message: 'Connexion réussie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
};

export const logoutUser = (req, res) => {
  try {
    logout(res);
    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la déconnexion.' });
  }
};
