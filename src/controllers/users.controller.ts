import { followUser, getSuggestedUsers, getUserById, getUserProfile, getUsers, updateUser } from '../services/user.service';

export const getUsersHandler = async (req, res) => {
  try {
    const users = await getUsers();

    res.status(200).json({ message: 'Utilisateurs récupérés avec succès', data: users });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getUserProfileHandler = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await getUserProfile(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Utilisateur récupéré avec succès', data: user });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getCurrentUserHandler = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await getUserProfile(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Utilisateur récupéré avec succès', data: user });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getSuggestedUsersHandler = async (req, res) => {
  try {
    const userId = req.user.id;

    const users = await getSuggestedUsers(userId);

    res.status(200).json({ message: 'Utilisateurs récupérés avec succès', data: users });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const followHandler = async (req, res) => {
  try {
    const existingUser = getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const follows = followUser(req.user.id, req.params.id);

    res.status(200).json({ message: 'Utilisateur suivi avec succès', data: follows });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const unfollowHandler = async (req, res) => {
  try {
    const existingUser = getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const unfollows = followUser(req.user.id, req.params.id);

    res.status(200).json({ message: 'Utilisateur unsuivi avec succès', data: unfollows }); // refactor
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const updateUserHandler = async (req, res) => {
  try {
    const data = req.params.body; // refactor

    const updatedUser = updateUser(req.params.id, data);

    res.status(200).json({ message: 'Utilisateur modiifié avec succès', data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
