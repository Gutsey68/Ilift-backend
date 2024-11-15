import { createUser } from '../services/auth.service';
import { findUserByEmail, findUserByPseudo } from '../services/user.service';
import { comparePasswords } from '../utils/hash';
import { createJWT } from '../utils/jwt';

export const createNewUserHandler = async (req, res) => {
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
    res.status(201).json({ message: 'Utilisateur créé avec succès.', data: { user: newUser } });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const signinHandler = async (req, res) => {
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
    res.status(200).json({
      message: 'Connexion réussie',
      data: {
        user: { id: user.id, pseudo: user.pseudo, email: user.email }
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
