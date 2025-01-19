/**
 * @fileoverview Définition de la classe d'erreur personnalisée et des codes d'erreur
 * Permet une gestion cohérente des erreurs à travers l'application
 */

import { ErrorType } from '../types/error.types';

/**
 * Classe d'erreur personnalisée pour l'application
 * @extends Error
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly type: ErrorType;
  public readonly isOperational: boolean;
  public readonly code: string;
  public readonly details?: unknown;

  /**
   * @param {Object} params - Paramètres de l'erreur
   * @param {string} params.message - Message d'erreur
   * @param {number} params.statusCode - Code HTTP de l'erreur
   * @param {ErrorType} params.type - Type d'erreur
   * @param {string} params.code - Code d'erreur unique
   * @param {unknown} [params.details] - Détails supplémentaires de l'erreur
   * @param {boolean} [params.isOperational] - Indique si l'erreur est opérationnelle
   */
  constructor(params: { message: string; statusCode: number; type: ErrorType; code: string; details?: unknown; isOperational?: boolean }) {
    super(params.message);
    this.statusCode = params.statusCode;
    this.type = params.type;
    this.code = params.code;
    this.details = params.details;
    this.isOperational = params.isOperational ?? true;
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Crée une erreur de type Bad Request (400)
   */
  static BadRequest(message: string, code: string, details?: unknown) {
    return new AppError({
      message,
      statusCode: 400,
      type: ErrorType.BAD_REQUEST,
      code,
      details
    });
  }

  /**
   * Crée une erreur de type Unauthorized (401)
   */
  static Unauthorized(message: string, code: string) {
    return new AppError({
      message,
      statusCode: 401,
      type: ErrorType.AUTHENTICATION,
      code
    });
  }

  /**
   * Crée une erreur de type Forbidden (403)
   */
  static Forbidden(message: string, code: string) {
    return new AppError({
      message,
      statusCode: 403,
      type: ErrorType.AUTHORIZATION,
      code
    });
  }

  /**
   * Crée une erreur de type Not Found (404)
   */
  static NotFound(message: string, code: string) {
    return new AppError({
      message,
      statusCode: 404,
      type: ErrorType.NOT_FOUND,
      code
    });
  }

  /**
   * Crée une erreur de type Conflict (409)
   */
  static Conflict(message: string, code: string) {
    return new AppError({
      message,
      statusCode: 409,
      type: ErrorType.CONFLICT,
      code
    });
  }
}

/**
 * Codes d'erreur constants utilisés dans l'application
 * @enum {string}
 */
export const ErrorCodes = {
  // Codes d'authentification
  INVALID_CREDENTIALS: 'AUTH_001',
  USER_NOT_FOUND: 'AUTH_002',
  USER_BANNED: 'AUTH_003',
  INVALID_TOKEN: 'AUTH_004',
  EXPIRED_TOKEN: 'AUTH_005',
  // Codes d'utilisateur
  DUPLICATE_EMAIL: 'USER_001',
  DUPLICATE_PSEUDO: 'USER_002',
  INVALID_USER_DATA: 'USER_003',
  // Codes de ressource
  DUPLICATE_ENTRY: 'RES_001',
  RESOURCE_NOT_FOUND: 'RES_002',
  // Codes de validation
  VALIDATION_ERROR: 'VAL_001',
  // Codes internes
  INTERNAL_ERROR: 'INT_001',
  // Codes généraux
  NOT_FOUND: 'NF_001',
  BAD_REQUEST: 'BR_001',
  EXERCICE_NOT_FOUND: 'EX_001',
  DUPLICATE_EXERCICE: 'EX_002',
  WORKOUT_NOT_FOUND: 'WO_001',
  PROGRAM_NOT_FOUND: 'PRG_001'
} as const;
