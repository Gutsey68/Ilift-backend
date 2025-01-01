import { followUser, getFollowById, unfollowUser } from '../services/follows.service';
import { createNotification } from '../services/notifications.service';
import { getUserById } from '../services/users.service';

export const followHandler = async (req, res) => {
  try {
    if (req.params.id == req.user.id) {
      return res.status(400).json({ error: 'Vous ne pouvez pas vous suivre vous-même.' });
    }

    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const existingFollow = await getFollowById(req.user.id, req.params.id);

    if (existingFollow) {
      return res.status(400).json({ error: "Vous suivez déjà l'utilisateur" });
    }

    const follows = await followUser(req.user.id, req.params.id);

    if (!follows) {
      return res.status(400).json({ error: "Erreur lors du suivi de l'utilisateur" });
    }

    await createNotification(req.params.id, req.user.id, 'follow', `${req.user.pseudo} a commencé à vous suivre`);

    res.status(200).json({ message: 'Utilisateur suivi avec succès', data: follows });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const unfollowHandler = async (req, res) => {
  try {
    if (req.params.id == req.user.id) {
      return res.status(400).json({ error: 'Vous ne pouvez pas vous suivre vous-même.' });
    }

    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const existingFollow = await getFollowById(req.user.id, req.params.id);

    if (!existingFollow) {
      return res.status(404).json({ error: "Vous ne suivez pas l'utilisateur" });
    }

    const follows = await unfollowUser(req.user.id, req.params.id);

    if (!follows) {
      return res.status(400).json({ error: "Erreur lors de l'arrêt du suivi de l'utilisateur" });
    }

    res.status(200).json({ message: "Arret de suivi de l'utilisateur avec succès" });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const deleteFollowerHandler = async (req, res) => {
  try {
    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const existingFollow = await getFollowById(req.params.id, req.user.id);

    if (!existingFollow) {
      return res.status(404).json({ error: 'Cet utilisateur ne vous suit pas' });
    }

    const follows = await unfollowUser(req.params.id, req.user.id);

    if (!follows) {
      return res.status(400).json({ error: 'Erreur lors de la suppression de suivi' });
    }

    res.status(200).json({ message: 'Abonné supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
