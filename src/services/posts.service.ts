import prisma from '../database/db';

export const getPosts = async () => {
  return await prisma.posts.findMany();
};

export const getPostById = async (id: string) => {
  return await prisma.posts.findUnique({
    where: { id }
  });
};

export const getAllPostsByUser = async (userId: string) => {
  return await prisma.posts.findMany({
    where: {
      author: {
        id: userId
      }
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      },
      author: true,
      _count: {
        select: {
          likes: true
        }
      }
    }
  });
};

export const getPostsOfUserAndHisFollowings = async (userId: string, page: number) => {
  const followedUsers = await prisma.follows.findMany({
    where: {
      followedById: userId
    },
    select: {
      followingId: true
    }
  });

  const userIds = [userId, ...followedUsers.map(follow => follow.followingId)];

  const posts = await prisma.posts.findMany({
    where: {
      authorId: {
        in: userIds
      }
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      },
      author: true,
      _count: {
        select: {
          likes: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: (page - 1) * 10,
    take: 10
  });

  return posts;
};

export const createPost = async (photo: string, content: string, authorId: string) => {
  return await prisma.posts.create({
    data: {
      photo,
      content,
      authorId
    }
  });
};

export const updatePost = async (data, id) => {
  return await prisma.posts.update({
    where: { id },
    data
  });
};

export const deletePost = async (id: string) => {
  return await prisma.posts.delete({
    where: { id }
  });
};

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

export const commentPost = async (content: string, usersId: string, postsId: string) => {
  return await prisma.usersComments.create({
    data: {
      content,
      usersId,
      postsId
    }
  });
};

export const getCommentsOfPost = async (postsId: string) => {
  return await prisma.usersComments.findMany({
    where: {
      postsId
    },
    include: {
      users: {
        select: {
          id: true,
          pseudo: true,
          profilePhoto: true
        }
      }
    }
  });
};

export const deleteComment = async (postsId: string, usersId: string) => {
  return await prisma.usersComments.delete({
    where: {
      postsId_usersId: {
        postsId,
        usersId
      }
    }
  });
};

export const getCommentById = async (postsId: string, usersId: string) => {
  return await prisma.usersComments.findUnique({
    where: {
      postsId_usersId: {
        postsId,
        usersId
      }
    }
  });
};

export const updateComment = async (content: string, postsId: string, usersId: string) => {
  return await prisma.usersComments.update({
    where: {
      postsId_usersId: {
        postsId,
        usersId
      }
    },
    data: {
      content
    }
  });
};
