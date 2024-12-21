import prisma from '../database/db';

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserProfile = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      pseudo: true,
      email: true,
      bio: true,
      createdAt: true,
      profilePhoto: true,
      roleId: true,
      workouts: {
        select: {
          id: true,
          name: true,
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc'
        },
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
        select: {
          name: true
        }
      }
    }
  });
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

export const updateUser = async (
  userId: string,
  data: { pseudo?: string; email?: string; bio?: string; isBan?: boolean; passwordHash?: string; profilePhoto?: string }
) => {
  return await prisma.user.update({
    where: { id: userId },
    data
  });
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

export const getFollowers = async (userId: string) => {
  return await prisma.user.findMany({
    where: {
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
          followedById: userId
        },
        select: {
          followedById: true
        }
      }
    }
  });
};

export const getFollowings = async (userId: string) => {
  return await prisma.user.findMany({
    where: {
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
