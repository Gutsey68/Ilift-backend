import { getFollowById } from '../services/follows.service';
import {
  findUserByEmail,
  findUserByPseudo,
  getAdditionalUsers,
  getFollowers,
  getFollowings,
  getUserById,
  getUserProfile,
  getUsers,
  getUsersAdmin,
  getUsersFollowedByUsersIfollow,
  getUsersIfollow,
  updateUser
} from '../services/users.service';

export const getUsersHandler = async (req, res) => {
  try {
    const users = await getUsers();

    if (!users) {
      return res.status(404).json({ error: 'Aucun utilisateur trouvé' });
    }

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

    const amIFollowing = await getFollowById(req.user.id, userId);

    const dataUser = { ...user, amIFollowing: !!amIFollowing };

    res.status(200).json({ message: 'Utilisateur récupéré avec succès', data: dataUser });
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

    if (!usersIfollow) {
      return res.status(404).json({ error: 'Aucun utilisateur suivi trouvé' });
    }

    const usersIfollowIds = usersIfollow.map(user => user.id);

    const usersfollowedByusersIfollow = await getUsersFollowedByUsersIfollow(userId, usersIfollowIds);

    if (!usersfollowedByusersIfollow) {
      return res.status(404).json({ error: 'Aucun utilisateur suivi par les utilisateurs que vous suivez trouvé' });
    }

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

    if (!result) {
      return res.status(404).json({ error: 'Aucun utilisateur recommandé trouvé' });
    }

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
      req.body.profilePhoto = '/' + req.file.path.replace(/\\/g, '/');
    }

    const updatedUser = await updateUser(req.params.id, req.body);

    if (!updatedUser) {
      return res.status(400).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }

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

export const getUsersAdminHandler = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 20;

    let sort;
    if (req.query.sort) {
      try {
        sort = JSON.parse(req.query.sort);
        if (!sort.field || !['asc', 'desc'].includes(sort.order)) {
          return res.status(400).json({
            error: 'Format de tri invalide. Attendu: { "field": "string", "order": "asc" | "desc" }'
          });
        }
      } catch (e) {
        return res.status(400).json({
          error: 'Paramètre de tri invalide'
        });
      }
    }

    const users = await getUsersAdmin(page, size, sort);

    if (!users.data.length) {
      return res.status(404).json({ error: 'Aucun utilisateur trouvé' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getUsersAdminHandler:', error);
    res.status(500).json({
      error: 'Erreur Interne du Serveur',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
