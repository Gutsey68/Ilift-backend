/**
 * @fileoverview Service de gestion des publications
 * Fournit les fonctions CRUD et les requêtes spécialisées pour les publications
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';
import { CreatePostParams, PostsSortParams } from '../types/posts.types';

/**
 * Récupère les publications avec pagination et tri
 * @param {number} page - Numéro de la page
 * @param {number} size - Nombre d'éléments par page
 * @param {PostsSortParams} sort - Paramètres de tri
 * @returns {Promise<{data: Post[], meta: {totalRowCount: number}}>}
 * @throws {AppError} Si aucune publication n'est trouvée
 */
export const getPosts = async (page: number, size: number, sort?: PostsSortParams) => {
  const skip = (page - 1) * size;
  const sortOrder = sort?.order === 'desc' ? Prisma.SortOrder.desc : Prisma.SortOrder.asc;
  let orderBy: Prisma.PostsOrderByWithRelationInput = { createdAt: Prisma.SortOrder.desc };

  if (sort?.field) {
    orderBy = sort.field.includes('.') ? { [sort.field.split('.')[0]]: { [sort.field.split('.')[1]]: sortOrder } } : { [sort.field]: sortOrder };
  }

  const [posts, total] = await Promise.all([
    prisma.posts.findMany({
      skip,
      take: size,
      orderBy,
      include: {
        tags: {
          include: { tag: true }
        },
        author: {
          select: {
            id: true,
            pseudo: true,
            profilePhoto: true
          }
        },
        exercicesResultsPosts: {
          include: {
            exercicesResults: {
              include: {
                exercice: true,
                sets: true
              }
            }
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

  if (!posts.length) {
    throw AppError.NotFound('Aucune publication trouvée', ErrorCodes.NOT_FOUND);
  }

  return { data: posts, meta: { totalRowCount: total } };
};

/**
 * Récupère une publication par son identifiant
 * @param {string} id - Identifiant de la publication
 * @returns {Promise<Post>} La publication trouvée
 * @throws {AppError} Si la publication n'est pas trouvée
 */
export const getPostById = async (id: string) => {
  const post = await prisma.posts.findUnique({
    where: { id }
  });

  if (!post) {
    throw AppError.NotFound('Publication non trouvée', ErrorCodes.NOT_FOUND);
  }

  return post;
};

/**
 * Récupère toutes les publications d'un utilisateur avec pagination
 * @param {string} userId - Identifiant de l'utilisateur
 * @param {number} page - Numéro de la page
 * @returns {Promise<Post[]>} Liste des publications de l'utilisateur
 */
export const getAllPostsByUser = async (userId: string, page: number) => {
  return await prisma.posts.findMany({
    where: {
      isValid: true,
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
      exercicesResultsPosts: {
        include: {
          exercicesResults: {
            include: {
              exercice: true,
              sets: true
            }
          }
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

/**
 * Récupère les publications de l'utilisateur et de ses abonnements avec pagination
 * @param {string} userId - Identifiant de l'utilisateur
 * @param {number} page - Numéro de la page
 * @returns {Promise<Post[]>} Liste des publications de l'utilisateur et de ses abonnements
 */
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
      isValid: true,
      authorId: {
        in: userIds
      }
    },
    include: {
      tags: {
        include: { tag: true }
      },
      author: {
        select: {
          id: true,
          pseudo: true,
          profilePhoto: true
        }
      },
      exercicesResultsPosts: {
        include: {
          exercicesResults: {
            include: {
              exercice: true,
              sets: true
            }
          }
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
      },
      posts: {
        isValid: true
      }
    },
    include: {
      posts: {
        include: {
          tags: {
            include: { tag: true }
          },
          author: {
            select: {
              id: true,
              pseudo: true,
              profilePhoto: true
            }
          },
          exercicesResultsPosts: {
            include: {
              exercicesResults: {
                include: {
                  exercice: true,
                  sets: true
                }
              }
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

  const randomPosts = await getRandomsPosts();

  const existingPostIds = new Set(paginatedPosts.map(post => post.id));
  const filteredRandomPosts = randomPosts
    .filter(post => !existingPostIds.has(post.id))
    .map(post => ({
      ...post,
      isShared: false,
      sharedAt: null,
      isSuggested: true
    }));

  return [...paginatedPosts, ...filteredRandomPosts].slice(0, 10);
};

/**
 * Crée une publication avec des tags et des résultats d'exercice
 * @param {CreatePostParams} params - Paramètres de création de la publication
 * @returns {Promise<Post>} La publication créée
 * @throws {AppError} Si une erreur survient lors de la création
 */
export const createPostWithTags = async ({ photo, content, userId, tags, exerciseResults }: CreatePostParams) => {
  try {
    return await prisma.posts.create({
      data: {
        photo,
        content,
        authorId: userId,
        tags: {
          create:
            tags?.map(tagName => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName }
                }
              }
            })) ?? []
        },
        exercicesResultsPosts: {
          create:
            exerciseResults?.map(resultId => ({
              exercicesResults: {
                connect: { id: resultId }
              }
            })) ?? []
        }
      },
      include: {
        tags: { include: { tag: true } },
        author: true,
        exercicesResultsPosts: {
          include: {
            exercicesResults: {
              include: {
                exercice: true,
                sets: true
              }
            }
          }
        },
        _count: { select: { likes: true } }
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw AppError.BadRequest('Erreur lors de la création de la publication', ErrorCodes.BAD_REQUEST);
    }
    throw error;
  }
};

/**
 * Met à jour une publication
 * @param {string} id - Identifiant de la publication
 * @param {Object} data - Données à mettre à jour
 * @param {string} [data.content] - Nouveau contenu de la publication
 * @param {string|null} [data.photo] - Nouvelle photo de la publication
 * @param {boolean} [data.isValid] - Statut de validation de la publication
 * @param {string[]} [data.tags] - Nouveaux tags de la publication
 * @returns {Promise<Post>} La publication mise à jour
 * @throws {AppError} Si la publication n'est pas trouvée ou si une erreur survient lors de la mise à jour
 */
export const updatePost = async (id: string, data: { content?: string; photo?: string | null; isValid?: boolean; tags?: string[] }) => {
  try {
    return await prisma.posts.update({
      where: { id },
      data: {
        ...data,
        isValid: data.isValid !== undefined ? data.isValid : undefined,
        photo: data.photo !== undefined ? data.photo : undefined,
        tags:
          data.tags !== undefined
            ? {
                deleteMany: {},
                create: data.tags.map(tagName => ({
                  tag: {
                    connectOrCreate: {
                      where: { name: tagName },
                      create: { name: tagName }
                    }
                  }
                }))
              }
            : undefined
      },
      include: {
        tags: { include: { tag: true } }
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Publication non trouvée', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

/**
 * Supprime une publication
 * @param {string} id - Identifiant de la publication
 * @returns {Promise<Post>} La publication supprimée
 * @throws {AppError} Si la publication n'est pas trouvée ou si une erreur survient lors de la suppression
 */
export const deletePost = async (id: string) => {
  try {
    return await prisma.posts.delete({
      where: { id }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Publication non trouvée', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

/**
 * Récupère des publications aléatoires populaires
 * @returns {Promise<Post[]>} Liste des publications triées par nombre de likes
 */
export const getRandomsPosts = async () => {
  return await prisma.posts.findMany({
    where: {
      isValid: true
    },
    take: 20,
    orderBy: {
      likes: {
        _count: 'desc'
      }
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true
        }
      },
      author: {
        select: {
          id: true,
          pseudo: true,
          profilePhoto: true
        }
      }
    }
  });
};
