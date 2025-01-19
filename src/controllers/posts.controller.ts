/**
 * @fileovview Contrôleurs pour la gestion des publications
 * Gère les requêtes liées aux publications et leurs interactions
 */

import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import { checkLikeExists } from '../services/likes.service';
import {
  createPostWithTags,
  deletePost,
  getAllPostsByUser,
  getPostById,
  getPosts,
  getPostsOfUserAndHisFollowings,
  updatePost
} from '../services/posts.service';
import { PostWithExtras } from '../types/posts.types';

/**
 * Récupère les publications avec pagination et tri
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si le format de tri est invalide
 */
export const getPostsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 20;
    let sort;

    if (req.query.sort) {
      try {
        sort = JSON.parse(req.query.sort as string);
        if (!sort.field || !['asc', 'desc'].includes(sort.order)) {
          throw AppError.BadRequest('Format de tri invalide', ErrorCodes.BAD_REQUEST);
        }
      } catch {
        throw AppError.BadRequest('Paramètre de tri invalide', ErrorCodes.BAD_REQUEST);
      }
    }

    const posts = await getPosts(page, size, sort);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère une publication par son identifiant
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si la publication n'existe pas
 */
export const getPostByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const id = req.params.id;
    const post = await getPostById(id);

    if (!post) {
      throw AppError.NotFound('Poste non trouvé', ErrorCodes.NOT_FOUND);
    }

    res.status(200).json({ message: 'Publication récupérée avec succès', data: post });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère toutes les publications d'un utilisateur avec pagination
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si l'ID utilisateur est manquant
 */
export const getAllPostsByUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const userId = req.params.userId;
    const page = parseInt(req.query.page as string) || 1;

    if (!userId) {
      throw AppError.BadRequest("Id de l'utilisateur manquant", ErrorCodes.BAD_REQUEST);
    }

    const posts = await getAllPostsByUser(userId, page);

    if (!posts) {
      throw AppError.NotFound('Aucune publication trouvée', ErrorCodes.NOT_FOUND);
    }

    const postsWithLikes = posts.map(post => ({ ...post, doILike: false }));

    for (let i = 0; i < postsWithLikes.length; i++) {
      const like = await checkLikeExists(posts[i].id, req.user.id);
      postsWithLikes[i].doILike = !!like;
    }

    res.status(200).json({ message: 'Publications récupérées avec succès', data: postsWithLikes });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère les publications d'un utilisateur et de ses abonnements
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si l'ID utilisateur est manquant
 */
export const getPostsOfUserAndHisFollowingsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const userId = req.params.userId;

    if (!userId) {
      throw AppError.BadRequest("Id de l'utilisateur manquant", ErrorCodes.BAD_REQUEST);
    }

    const page = parseInt(req.query.page as string) || 1;

    const posts = await getPostsOfUserAndHisFollowings(userId, page);

    if (!posts) {
      throw AppError.NotFound('Aucune publication trouvée', ErrorCodes.NOT_FOUND);
    }

    const postsWithLikes = (posts as PostWithExtras[]).map(post => ({
      ...post,
      doILike: false
    }));

    for (let i = 0; i < postsWithLikes.length; i++) {
      const like = await checkLikeExists(posts[i].id, req.user.id);
      postsWithLikes[i].doILike = !!like;
    }

    const postsWithInformations = postsWithLikes.map(post => ({
      ...post,
      isMyPost: false,
      isSuggested: post.isSuggested ?? false
    }));

    for (let i = 0; i < postsWithInformations.length; i++) {
      if (postsWithInformations[i].author.id === req.user.id) {
        postsWithInformations[i].isMyPost = true;
      }
    }

    res.status(200).json({ message: 'Publications récupérées avec succès', data: postsWithInformations });
  } catch (error) {
    next(error);
  }
};

/**
 * Crée une nouvelle publication avec tags et résultats d'exercices
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si les données sont invalides
 */
export const createPostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const { content } = req.body;
    let tags = [];
    let exerciseResults = [];

    if (req.body.tags) {
      tags = Array.isArray(req.body.tags) ? req.body.tags : typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : [req.body.tags];
    }

    if (req.body.exerciseResults) {
      exerciseResults = Array.isArray(req.body.exerciseResults)
        ? req.body.exerciseResults
        : typeof req.body.exerciseResults === 'string'
        ? JSON.parse(req.body.exerciseResults)
        : [req.body.exerciseResults];
    }

    const photo = req.file ? '/' + req.file.path.replace(/\\/g, '/') : null;

    const post = await createPostWithTags({
      photo,
      content,
      userId: req.user.id,
      tags,
      exerciseResults
    });

    res.status(201).json({
      message: 'Publication créée avec succès',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Met à jour une publication existante
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si la publication n'existe pas
 */
export const updatePostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const id = req.params.id;
    const existingPost = await getPostById(id);

    if (!existingPost) {
      throw AppError.NotFound('Publication non trouvée', ErrorCodes.NOT_FOUND);
    }

    const updateData: {
      content?: string;
      photo?: string | null;
      isValid?: boolean;
      tags?: any[];
    } = {};

    if (req.body.content) {
      updateData.content = req.body.content;
    }

    if (req.body.removeTags === 'true' || req.body.removeTags === true) {
      updateData.tags = [];
    } else if (req.body.tags) {
      try {
        updateData.tags = JSON.parse(req.body.tags);
      } catch (e) {
        updateData.tags = [req.body.tags];
      }
    }

    if (req.body.removePhoto === 'true' || req.body.removePhoto === true) {
      updateData.photo = null;
    } else if (req.file) {
      updateData.photo = '/' + req.file.path.replace(/\\/g, '/');
    }

    if (req.body.isValid !== undefined) {
      updateData.isValid = req.body.isValid;
    }

    const updatedPost = await updatePost(id, updateData);

    if (!updatedPost) {
      throw AppError.BadRequest("La publication n'a pas pu être mise à jour", ErrorCodes.BAD_REQUEST);
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

/**
 * Supprime une publication
 * @throws {AppError} Si l'utilisateur n'est pas authentifié ou si la publication n'existe pas
 */
export const deletePostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const id = req.params.id;
    const post = await getPostById(id);

    if (!post) {
      throw AppError.NotFound('Publication non trouvée', ErrorCodes.NOT_FOUND);
    }

    const deletedPost = await deletePost(id);

    if (!deletedPost) {
      throw AppError.BadRequest("La publication n'a pas pu être supprimée", ErrorCodes.BAD_REQUEST);
    }

    res.status(200).json({ message: 'Publication supprimée avec succès' });
  } catch (error) {
    next(error);
  }
};
