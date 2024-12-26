import { Prisma } from '@prisma/client';
import prisma from '../database/db';

// Définir le type pour les paramètres de tri
type SortParams = {
  field: string;
  order: 'asc' | 'desc';
};

export const getPosts = async (page: number, size: number, sort?: SortParams) => {
  const skip = (page - 1) * size;

  // Conversion de 'asc'/'desc' en Prisma.SortOrder
  const sortOrder = sort?.order === 'desc' ? Prisma.SortOrder.desc : Prisma.SortOrder.asc;

  // Gestion du tri pour les champs imbriqués
  let orderBy: Prisma.PostsOrderByWithRelationInput = { createdAt: Prisma.SortOrder.desc };

  if (sort?.field) {
    if (sort.field.includes('.')) {
      // Gestion des champs imbriqués (ex: author.pseudo)
      const [relation, field] = sort.field.split('.');
      orderBy = {
        [relation]: {
          [field]: sortOrder
        }
      };
    } else {
      // Gestion des champs directs
      orderBy = {
        [sort.field]: sortOrder
      };
    }
  }

  try {
    const [posts, total] = await Promise.all([
      prisma.posts.findMany({
        skip,
        take: size,
        orderBy,
        include: {
          tags: {
            include: {
              tag: true
            }
          },
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
      }),
      prisma.posts.count()
    ]);

    return {
      data: posts,
      meta: {
        totalRowCount: total
      }
    };
  } catch (error) {
    console.error('Erreur dans getPosts:', error);
    throw error;
  }
};

export const getPostById = async (id: string) => {
  return await prisma.posts.findUnique({
    where: { id }
  });
};

export const getAllPostsByUser = async (userId: string, page: number) => {
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
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10,
    skip: (page - 1) * 10
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

  const directPosts = await prisma.posts.findMany({
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
  });

  const sharedPosts = await prisma.usersShares.findMany({
    where: {
      usersId: {
        in: userIds
      }
    },
    include: {
      posts: {
        include: {
          tags: {
            include: {
              tag: true
            }
          },
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
      },
      users: {
        select: {
          id: true,
          pseudo: true
        }
      }
    }
  });

  const formattedSharedPosts = sharedPosts.map(share => ({
    ...share.posts,
    isShared: true,
    sharedBy: share.usersId,
    sharedByUser: share.users,
    sharedAt: share.createdAt
  }));

  const allPosts = [
    ...directPosts.map(post => ({
      ...post,
      isShared: false,
      sharedAt: null
    })),
    ...formattedSharedPosts
  ];

  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = a.sharedAt || a.createdAt;
    const dateB = b.sharedAt || b.createdAt;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const paginatedPosts = sortedPosts.slice((page - 1) * 10, page * 10);

  return paginatedPosts;
};

type CreatePostParams = {
  photo: string | null;
  content: string;
  userId: string;
  tags?: string[];
};

export const createPostWithTags = async ({ photo, content, userId, tags }: CreatePostParams) => {
  return await prisma.posts.create({
    data: {
      photo,
      content,
      authorId: userId,
      tags: {
        create: tags
          ? tags.map(tagName => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName }
                }
              }
            }))
          : []
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
