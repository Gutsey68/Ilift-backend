/**
 * @fileoverview Types pour la gestion des séances d'entraînement
 */

/**
 * Données de mise à jour d'une séance
 * @typedef {Object} UpdateWorkoutData
 */
export type UpdateWorkoutData = {
  name?: string;
  position?: number;
};

/**
 * Association entre une séance et un exercice
 * @typedef {Object} WorkoutExercice
 */
export type WorkoutExercice = {
  workoutId: string;
  exerciceId: string;
  position: number;
};
