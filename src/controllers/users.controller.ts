/**
 * @fileovview Contrôleurs pour la gestion des utilisateurs
 * Gère les requêtes liées aux profils et relations utilisateurs
 */

import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { checkFollowExists } from '../services/follows.service';
import {
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

/**
 * Récupère la liste des utilisateurs
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
export const getUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const users = await getUsers();
    res.status(200).json({
      message: 'Utilisateurs récupérés avec succès',
      data: users
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère le profil d'un utilisateur spécifique avec son statut de suivi
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou n'existe pas
 */
export const getUserProfileHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const user = await getUserProfile(req.params.id);
    const follow = await checkFollowExists(req.user.id, req.params.id);

    res.status(200).json({
      message: 'Utilisateur récupéré avec succès',
      data: { ...user, amIFollowing: !!follow }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère le profil de l'utilisateur connecté
 * @throws {404} Si l'utilisateur n'existe pas
 * @throws {500} En cas d'erreur serveur
 */
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

/**
 * Récupère les suggestions d'utilisateurs à suivre
 * Inclut les utilisateurs suivis par les personnes que l'utilisateur suit
 * @throws {404} Si aucune suggestion n'est trouvée
 * @throws {500} En cas d'erreur serveur
 */
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

/**
 * Met à jour le profil d'un utilisateur
 * Gère également l'upload de photo de profil
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    if (req.file) {
      req.body.profilePhoto = '/' + req.file.path.replace(/\\/g, '/');
    }

    const updatedUser = await updateUser(req.params.id, req.body);

    res.status(200).json({
      message: 'Utilisateur modifié avec succès',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère la liste des abonnés d'un utilisateur
 * Inclut l'information si l'utilisateur connecté les suit
 * @throws {404} Si l'utilisateur ou ses abonnés n'existent pas
 * @throws {500} En cas d'erreur serveur
 */
export const getFollowersHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const loggedInUserId = req.user.id;

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const followers = await getFollowers(userId, loggedInUserId);

    if (!followers) {
      return res.status(404).json({ error: 'Aucun abonné trouvé' });
    }

    const formattedFollowers = followers.map(follower => ({
      id: follower.id,
      pseudo: follower.pseudo,
      profilePhoto: follower.profilePhoto,
      amIFollowing: follower.following.length > 0
    }));

    res.status(200).json({ message: 'Abonnés récupérés avec succès', data: formattedFollowers });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

/**
 * Récupère la liste des abonnements d'un utilisateur
 * @throws {404} Si l'utilisateur ou ses abonnements n'existent pas
 * @throws {500} En cas d'erreur serveur
 */
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

/**
 * Récupère la liste des utilisateurs pour l'interface admin
 * Inclut la pagination et le tri
 * @throws {400} Si les paramètres de tri sont invalides
 * @throws {404} Si aucun utilisateur n'est trouvé
 * @throws {500} En cas d'erreur serveur
 */
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
    res.status(500).json({
      error: 'Erreur Interne du Serveur'
    });
  }
};
