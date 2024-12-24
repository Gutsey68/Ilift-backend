import prisma from '../database/db';

export const getLikeById = async (postsId: string, usersId: string) => {
  return await prisma.usersLikes.findUnique({
    where: {
      postsId_usersId: {
        postsId,
        usersId
      }
    }
  });
};

export const likePost = async (postsId: string, usersId: string) => {
  return await prisma.usersLikes.create({
    data: {
      postsId,
      usersId
    }
  });
};

export const unlikePost = async (postsId: string, usersId: string) => {
  return await prisma.usersLikes.delete({
    where: {
      postsId_usersId: {
        postsId,
        usersId
      }
    }
  });
};

export const getLikesOfPost = async (postsId: string) => {
  return await prisma.usersLikes.count({
    where: {
      postsId
    }
  });
};

export const getLikes = async () => {
  return await prisma.usersLikes.findMany();
};

export const getLikesOfAUser = async (usersId: string) => {
  return await prisma.usersLikes.findMany({
    where: {
      usersId
    },
    include: {
      posts: {
        include: {
          tags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          comments: true,
          likes: true,
          author: {
            select: {
              id: true,
              pseudo: true,
              profilePhoto: true
            }
          },
          _count: {
            select: {
              likes: true,
              comments: true
            }
          }
        }
      }
    },
    orderBy: {
      posts: {
        createdAt: 'desc'
      }
    }
  });
};
