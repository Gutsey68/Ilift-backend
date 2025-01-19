/**
 * @fileoverview Types pour la gestion des utilisateurs
 */

/**
 * Données de mise à jour d'un utilisateur
 * @typedef {Object} UpdateUserData
 */
export type UpdateUserData = {
  pseudo?: string;
  email?: string;
  bio?: string;
  isBan?: boolean;
  passwordHash?: string;
  profilePhoto?: string;
  city?: string;
};

/**
 * Paramètres de tri pour les utilisateurs
 * @typedef {Object} UsersSortParams
 */
export type UserSortParams = {
  field: string;
  order: 'asc' | 'desc';
};

/**
 * Type pour les paramètres de tri
 */
export type UsersSortParams = {
  field: string;
  order: 'asc' | 'desc';
};
