/**
 * @fileoverview Types pour la gestion des résultats d'exercices
 */

/**
 * Structure d'une série d'exercice
 * @typedef {Object} Set
 */
export type Set = {
  reps: number;
  weight: number;
};

/**
 * Données pour la création d'un résultat
 * @typedef {Object} CreateResultData
 */
export type CreateResultData = {
  exerciceId: string;
  sets: Set[];
};

/**
 * Données pour la mise à jour d'un résultat
 * @typedef {Object} UpdateResultData
 */
export type UpdateResultData = {
  sets: Set[];
};
