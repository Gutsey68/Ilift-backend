/**
 * @fileoverview Types pour la gestion des programmes d'entraînement
 */

/**
 * Type pour les données de mise à jour d'un programme
 * @typedef {Object} UpdateProgramData
 */
export type UpdateProgramData = {
  name?: string;
  description?: string;
  position?: number;
};
