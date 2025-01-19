/**
 * @fileoverview Types pour la gestion des erreurs
 * Définit les types d'erreurs et la structure des réponses d'erreur
 */

/**
 * Énumération des types d'erreurs de l'application
 * @enum {string}
 */
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  INTERNAL = 'INTERNAL_ERROR',
  BAD_REQUEST = 'BAD_REQUEST'
}

/**
 * Interface pour la structure des réponses d'erreur
 * @interface ErrorResponse
 */
export interface ErrorResponse {
  status: 'error';
  type: ErrorType;
  code: string;
  message: string;
  details?: unknown;
}
