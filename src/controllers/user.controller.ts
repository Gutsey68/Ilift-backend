import { createUser, findUserByEmail, findUserByPseudo, getUserProfile, getUsers } from '../services/user.service';
import { comparePasswords } from '../utils/hash';
import { createJWT } from '../utils/jwt';

export const getUsersHandler = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserProfileHandler = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await getUserProfile(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l’utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des informations de l’utilisateur' });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await getUserProfile(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l’utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des informations de l’utilisateur' });
  }
};

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
    res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur.' });
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
      user: { id: user.id, pseudo: user.pseudo, email: user.email },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
};
