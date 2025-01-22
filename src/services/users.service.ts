/**
 * @fileoverview Service de gestion des utilisateurs
 * Fournit les fonctions pour la gestion des utilisateurs et leurs relations
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';
import { UpdateUserData, UsersSortParams } from '../types/user.types';

/**
 * Récupère tous les utilisateurs non bannis
 * @throws {AppError} Si aucun utilisateur n'est trouvé
 */
export const getUsers = async () => {
  const users = await prisma.user.findMany({
    where: { isBan: false }
  });

  if (!users.length) {
    throw AppError.NotFound('Aucun utilisateur trouvé', ErrorCodes.USER_NOT_FOUND);
  }

  return users;
};

/**
 * Récupère le profil détaillé d'un utilisateur
 * @param {string} userId - Identifiant de l'utilisateur
 * @throws {AppError} Si l'utilisateur n'est pas trouvé
 */
export const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      pseudo: true,
      email: true,
      bio: true,
      createdAt: true,
      profilePhoto: true,
      isOnboardingCompleted: true,
      roleId: true,
      workouts: {
        select: {
          id: true,
          name: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        take: 1
      },
      _count: {
        select: {
          posts: true,
          followedBy: true,
          following: true,
          workouts: true
        }
      },
      city: {
        select: { name: true }
      }
    }
  });

  if (!user) {
    throw AppError.NotFound('Utilisateur non trouvé', ErrorCodes.USER_NOT_FOUND);
  }

  return user;
};

/**
 * Trouve un utilisateur par son pseudo
 * @param {string} pseudo - Pseudo de l'utilisateur
 * @returns {Promise<Prisma.User | null>} Utilisateur trouvé ou null
 */
export const findUserByPseudo = async (pseudo: string) => {
  return await prisma.user.findUnique({
    where: { pseudo }
  });
};

/**
 * Trouve un utilisateur par son email
 * @param {string} email - Email de l'utilisateur
 * @returns {Promise<Prisma.User | null>} Utilisateur trouvé ou null
 */
export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

/**
 * Met à jour les informations d'un utilisateur
 * @param {string} userId - Identifiant de l'utilisateur
 * @param {UpdateUserData} data - Données de mise à jour de l'utilisateur
 * @throws {AppError} Si l'utilisateur n'est pas trouvé ou si l'email/pseudo est déjà utilisé
 */
export const updateUser = async (userId: string, data: UpdateUserData) => {
  try {
    const { city, ...otherData } = data;

    if (city) {
      return await prisma.user.update({
        where: { id: userId },
        data: {
          ...otherData,
          city: {
            connectOrCreate: {
              where: { name: city },
              create: { name: city }
            }
          }
        }
      });
    }

    return await prisma.user.update({
      where: { id: userId },
      data: otherData
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw AppError.Conflict('Cet email ou pseudo est déjà utilisé', ErrorCodes.DUPLICATE_ENTRY);
      }
      if (error.code === 'P2025') {
        throw AppError.NotFound('Utilisateur non trouvé', ErrorCodes.USER_NOT_FOUND);
      }
    }
    throw error;
  }
};

/**
 * Récupère un utilisateur par son identifiant
 * @param {string} id - Identifiant de l'utilisateur
 * @returns {Promise<Prisma.User | null>} Utilisateur trouvé ou null
 */
export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id
    }
  });
};

/**
 * Récupère les utilisateurs suivis par un utilisateur
 * @param {string} userId - Identifiant de l'utilisateur
 * @returns {Promise<Prisma.User[]>} Liste des utilisateurs suivis
 */
export const getUsersIfollow = async (userId: string) => {
  return await prisma.user.findMany({
    where: {
      isBan: false,
      NOT: {
        id: userId
      },
      following: {
        some: {
          followedById: userId
        }
      }
    },
    select: {
      id: true
    }
  });
};

/**
 * Récupère les utilisateurs suivis par les utilisateurs que je suis
 * @param {string} userId - Identifiant de l'utilisateur
 * @param {string[]} usersIfollowIds - Liste des identifiants des utilisateurs suivis
 * @returns {Promise<Prisma.User[]>} Liste des utilisateurs suivis par les utilisateurs que je suis
 */
export const getUsersFollowedByUsersIfollow = async (userId: string, usersIfollowIds: string[]) => {
  const users = await prisma.user.findMany({
    where: {
      isBan: false,
      NOT: {
        id: {
          in: [userId, ...usersIfollowIds]
        }
      },
      following: {
        some: {
          followedById: { in: usersIfollowIds }
        }
      }
    },
    select: {
      id: true,
      pseudo: true,
      profilePhoto: true,
      following: {
        where: {
          followedById: { in: usersIfollowIds }
        },
        select: {
          followedBy: {
            select: {
              id: true,
              pseudo: true
            }
          }
        }
      },
      _count: {
        select: {
          following: {
            where: {
              followedById: { in: usersIfollowIds }
            }
          }
        }
      }
    }
  });

  return users.sort((a, b) => b._count.following - a._count.following).slice(0, 5);
};

/**
 * Récupère des utilisateurs supplémentaires
 * @param {string} userId - Identifiant de l'utilisateur
 * @param {string[]} existingUserIds - Liste des identifiants des utilisateurs existants
 * @returns {Promise<Prisma.User[]>} Liste des utilisateurs supplémentaires
 */
export const getAdditionalUsers = async (userId: string, existingUserIds: string[]) => {
  return await prisma.user.findMany({
    where: {
      isBan: false,
      NOT: {
        id: { in: [userId, ...existingUserIds] }
      }
    },
    select: {
      id: true,
      pseudo: true,
      profilePhoto: true
    },
    take: 5 - existingUserIds.length
  });
};

/**
 * Récupère les abonnés d'un utilisateur
 * @param {string} userId - Identifiant de l'utilisateur
 * @param {string} [loggedId] - Identifiant de l'utilisateur connecté
 * @returns {Promise<Prisma.User[]>} Liste des abonnés
 */
export const getFollowers = async (userId: string, loggedId?: string) => {
  const loggedInUser = loggedId;

  return await prisma.user.findMany({
    where: {
      isBan: false,
      NOT: {
        id: userId
      },
      followedBy: {
        some: {
          followingId: userId
        }
      }
    },
    select: {
      id: true,
      pseudo: true,
      profilePhoto: true,
      following: {
        where: {
          followedById: loggedInUser
        }
      }
    }
  });
};

/**
 * Récupère les utilisateurs suivis par un utilisateur
 * @param {string} userId - Identifiant de l'utilisateur
 * @returns {Promise<Prisma.User[]>} Liste des utilisateurs suivis
 */
export const getFollowings = async (userId: string) => {
  return await prisma.user.findMany({
    where: {
      isBan: false,
      NOT: {
        id: userId
      },
      following: {
        some: {
          followedById: userId
        }
      }
    },
    select: {
      id: true,
      pseudo: true,
      profilePhoto: true
    }
  });
};

/**
 * Récupère les utilisateurs pour l'administration
 * @param {number} page - Numéro de la page
 * @param {number} size - Taille de la page
 * @param {SortParams} [sort] - Paramètres de tri
 * @returns {Promise<{ data: Prisma.User[], meta: { totalRowCount: number } }>} Utilisateurs et métadonnées
 */
export const getUsersAdmin = async (page: number, size: number, sort?: UsersSortParams) => {
  const skip = (page - 1) * size;
  const sortOrder = sort?.order === 'desc' ? Prisma.SortOrder.desc : Prisma.SortOrder.asc;

  let orderBy: Prisma.UserOrderByWithRelationInput = { createdAt: Prisma.SortOrder.desc };

  if (sort?.field) {
    if (sort.field.includes('.')) {
      const [relation, field] = sort.field.split('.');
      orderBy = {
        [relation]: {
          [field]: sortOrder
        }
      };
    } else {
      orderBy = {
        [sort.field]: sortOrder
      };
    }
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: size,
      orderBy,
      select: {
        id: true,
        pseudo: true,
        email: true,
        createdAt: true,
        profilePhoto: true,
        roleId: true,
        isBan: true,
        _count: {
          select: {
            posts: true,
            followedBy: true,
            following: true
          }
        }
      }
    }),
    prisma.user.count()
  ]);

  return {
    data: users,
    meta: {
      totalRowCount: total
    }
  };
};
