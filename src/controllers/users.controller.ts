import {
  findUserByEmail,
  findUserByPseudo,
  followUser,
  getAdditionalUsers,
  getUserById,
  getUserProfile,
  getUsers,
  getUsersFollowedByUsersIfollow,
  getUsersIfollow,
  updateUser
} from '../services/users.service';

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

    const usersIfollow = await getUsersIfollow(userId);
    const usersIfollowIds = usersIfollow.map(user => user.id);

    const usersfollowedByusersIfollow = await getUsersFollowedByUsersIfollow(userId, usersIfollowIds);

    const result = usersfollowedByusersIfollow.map(user => {
      const commonFollowers = user.following
        .filter(follow => usersIfollowIds.includes(follow.followedBy.id))
        .map(follow => ({
          id: follow.followedBy.id,
          pseudo: follow.followedBy.pseudo
        }));

      return {
        id: user.id,
        pseudo: user.pseudo,
        profilePhoto: user.profilePhoto,
        commonFollowers,
        commonFollowersCount: commonFollowers.length
      };
    });

    if (result.length < 5) {
      const additionalUsers = await getAdditionalUsers(
        userId,
        result.map(user => user.id)
      );
      result.push(
        ...additionalUsers.map(user => ({
          id: user.id,
          pseudo: user.pseudo,
          profilePhoto: user.profilePhoto,
          commonFollowers: [],
          commonFollowersCount: 0
        }))
      );
    }

    res.status(200).json({ message: 'Utilisateurs récupérés avec succès', data: result });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const followHandler = async (req, res) => {
  try {
    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const follows = await followUser(req.user.id, req.params.id);

    res.status(200).json({ message: 'Utilisateur suivi avec succès', data: follows });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const unfollowHandler = async (req, res) => {
  try {
    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const unfollows = await followUser(req.user.id, req.params.id);

    res.status(200).json({ message: 'Utilisateur unsuivi avec succès', data: unfollows });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const updateUserHandler = async (req, res) => {
  try {
    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (req.body.pseudo) {
      const existingPseudo = await findUserByPseudo(req.body.pseudo);

      if (existingPseudo) {
        return res.status(400).json({ error: 'Ce pseudo est déjà utilisé.' });
      }
    }

    if (req.body.email) {
      const existingEmail = await findUserByEmail(req.body.email);

      if (existingEmail) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
      }
    }

    if (req.file) {
      req.body.profilePhoto = req.file.path;
    }

    const updatedUser = await updateUser(req.params.id, req.body);

    res.status(200).json({ message: 'Utilisateur modifié avec succès', data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur', details: error.message });
  }
};
