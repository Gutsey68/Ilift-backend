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

export const getSuggestedUsers = async (userId: string) => {
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
      followedBy: {
        where: {
          followingId: userId
        },
        select: {
          following: {
            select: {
              pseudo: true
            }
          }
        },
        take: 1
      },
      _count: {
        select: {
          following: {
            where: {
              followingId: userId
            }
          }
        }
      }
    },
    orderBy: {
      followedBy: {
        _count: 'desc'
      }
    },
    take: 5
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
