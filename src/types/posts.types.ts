/**
 * @fileoverview Types pour la gestion des publications
 */

/**
 * Paramètres de tri pour les publications
 * @typedef {Object} PostsSortParams
 */
export type PostsSortParams = {
  field: string;
  order: 'asc' | 'desc';
};

/**
 * Paramètres de création d'une publication
 * @typedef {Object} CreatePostParams
 */
export type CreatePostParams = {
  photo: string | null;
  content: string;
  userId: string;
  tags?: string[];
  exerciseResults?: string[];
};

/**
 * Interface étendue pour les publications avec métadonnées
 * @interface PostWithExtras
 */
export interface PostWithExtras extends Omit<any, 'isSuggested'> {
  doILike?: boolean;
  isMyPost?: boolean;
  isSuggested?: boolean;
  isShared: boolean;
  sharedAt: any;
  author: {
    id: string;
    pseudo: string;
    profilePhoto: string;
  };
}
