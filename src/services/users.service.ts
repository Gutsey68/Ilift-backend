import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';
import { UpdateUserData } from '../types/user.types';

type SortParams = {
  field: string;
  order: 'asc' | 'desc';
};

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    where: { isBan: false }
  });

  if (!users.length) {
    throw AppError.NotFound('Aucun utilisateur trouvé', ErrorCodes.USER_NOT_FOUND);
  }

  return users;
};

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

export const findUserByPseudo = async (pseudo: string) => {
  return await prisma.user.findUnique({
    where: { pseudo }
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

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

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id
    }
  });
};

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

export const getAdditionalUsers = async (userId: string, existingUserIds: string[]) => {
  return await prisma.user.findMany({
    where: {
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

export const getUsersAdmin = async (page: number, size: number, sort?: SortParams) => {
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
