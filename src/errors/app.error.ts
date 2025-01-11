import { ErrorType } from '../types/error.types';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly type: ErrorType;
  public readonly isOperational: boolean;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(params: { message: string; statusCode: number; type: ErrorType; code: string; details?: unknown; isOperational?: boolean }) {
    super(params.message);
    this.statusCode = params.statusCode;
    this.type = params.type;
    this.code = params.code;
    this.details = params.details;
    this.isOperational = params.isOperational ?? true;
    Error.captureStackTrace(this, this.constructor);
  }

  static BadRequest(message: string, code: string, details?: unknown) {
    return new AppError({
      message,
      statusCode: 400,
      type: ErrorType.BAD_REQUEST,
      code,
      details
    });
  }

  static Unauthorized(message: string, code: string) {
    return new AppError({
      message,
      statusCode: 401,
      type: ErrorType.AUTHENTICATION,
      code
    });
  }

  static Forbidden(message: string, code: string) {
    return new AppError({
      message,
      statusCode: 403,
      type: ErrorType.AUTHORIZATION,
      code
    });
  }

  static NotFound(message: string, code: string) {
    return new AppError({
      message,
      statusCode: 404,
      type: ErrorType.NOT_FOUND,
      code
    });
  }

  static Conflict(message: string, code: string) {
    return new AppError({
      message,
      statusCode: 409,
      type: ErrorType.CONFLICT,
      code
    });
  }
}

export const ErrorCodes = {
  INVALID_CREDENTIALS: 'AUTH_001',
  USER_NOT_FOUND: 'AUTH_002',
  USER_BANNED: 'AUTH_003',
  INVALID_TOKEN: 'AUTH_004',
  EXPIRED_TOKEN: 'AUTH_005',
  DUPLICATE_EMAIL: 'USER_001',
  DUPLICATE_PSEUDO: 'USER_002',
  INVALID_USER_DATA: 'USER_003',
  DUPLICATE_ENTRY: 'RES_001',
  RESOURCE_NOT_FOUND: 'RES_002',
  VALIDATION_ERROR: 'VAL_001',
  INTERNAL_ERROR: 'INT_001',
  NOT_FOUND: 'NF_001',
  BAD_REQUEST: 'BR_001',
  EXERCICE_NOT_FOUND: 'EX_001',
  DUPLICATE_EXERCICE: 'EX_002',
  WORKOUT_NOT_FOUND: 'WO_001',
  PROGRAM_NOT_FOUND: 'PRG_001'
} as const;
