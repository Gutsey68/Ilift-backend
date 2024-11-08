import { getUserProfile, getUsers } from '../services/user.service';

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
