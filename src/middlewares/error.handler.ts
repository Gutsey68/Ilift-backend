import { Prisma } from '@prisma/client';
import { ErrorRequestHandler, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/app.error';
import { ErrorType } from '../types/error.types';
import { isProd } from '../utils/env';

export const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  if (!isProd) {
    console.error(err);
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      type: err.type,
      code: err.code,
      message: err.message,
      ...(err.details && { details: err.details })
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      status: 'error',
      type: ErrorType.VALIDATION,
      code: 'VALIDATION_ERROR',
      message: 'Données invalides',
      details: err.errors
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    handlePrismaError(err, res);
    return;
  }

  res.status(500).json({
    status: 'error',
    type: ErrorType.INTERNAL,
    code: 'INTERNAL_ERROR',
    message: isProd ? 'Une erreur interne est survenue' : err.message
  });
};

const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError, res: Response): void => {
  switch (err.code) {
    case 'P2002':
      res.status(409).json({
        status: 'error',
        type: ErrorType.CONFLICT,
        code: 'DUPLICATE_ENTRY',
        message: 'Cette ressource existe déjà'
      });
      break;
    case 'P2025':
      res.status(404).json({
        status: 'error',
        type: ErrorType.NOT_FOUND,
        code: 'RESOURCE_NOT_FOUND',
        message: 'Ressource non trouvée'
      });
      break;
    default:
      res.status(500).json({
        status: 'error',
        type: ErrorType.INTERNAL,
        code: `PRISMA_${err.code}`,
        message: isProd ? 'Une erreur de base de données est survenue' : err.message
      });
  }
};
