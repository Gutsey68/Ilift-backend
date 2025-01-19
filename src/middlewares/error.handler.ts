/**
 * @fileoverview Gestionnaire d'erreurs global pour l'application
 * Gère les différents types d'erreurs et formate les réponses d'erreur
 */

import { Prisma } from '@prisma/client';
import { ErrorRequestHandler, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/app.error';
import { ErrorType } from '../types/error.types';
import { isProd } from '../utils/env';

/**
 * Middleware de gestion globale des erreurs
 * Transforme les différents types d'erreurs en réponses HTTP cohérentes
 * @type {ErrorRequestHandler}
 */
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

/**
 * Gère spécifiquement les erreurs Prisma
 * Transforme les codes d'erreur Prisma en réponses HTTP appropriées
 * @param {Prisma.PrismaClientKnownRequestError} err - L'erreur Prisma à traiter
 * @param {Response} res - L'objet response Express
 */
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
