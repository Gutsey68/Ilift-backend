import {
  findUserByEmail,
  findUserByPseudo,
  followUser,
  getAdditionalUsers,
  getFollowById,
  getFollowers,
  getFollowings,
  getUserById,
  getUserProfile,
  getUsers,
  getUsersFollowedByUsersIfollow,
  getUsersIfollow,
  unfollowUser,
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

    await unfollowUser(req.user.id, req.params.id);

    res.status(200).json({ message: 'Utilisateur non suivi avec succès' });
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
      req.body.profilePhoto = req.file.path.replace(/\\/g, '/');
    }

    const updatedUser = await updateUser(req.params.id, req.body);

    res.status(200).json({ message: 'Utilisateur modifié avec succès', data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur', details: error.message });
  }
};

export const getFollowersHandler = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const followers = await getFollowers(userId);

    if (!followers) {
      return res.status(404).json({ error: 'Aucun abonné trouvé' });
    }

    const formattedFollowers = followers.map(follower => ({
      id: follower.id,
      pseudo: follower.pseudo,
      profilePhoto: follower.profilePhoto,
      isFollowing: follower.following.length > 0
    }));

    res.status(200).json({ message: 'Abonnés récupérés avec succès', data: formattedFollowers });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getFollowingsHandler = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const followings = await getFollowings(userId);

    if (!followings) {
      return res.status(404).json({ error: 'Aucun abonnement trouvé' });
    }

    res.status(200).json({ message: 'Abonnements récupérés avec succès', data: followings });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
