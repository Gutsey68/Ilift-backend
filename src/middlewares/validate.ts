/**
 * @fileoverview Middleware de validation des données entrantes
 * Utilise Zod pour valider les données des requêtes (body, query, params)
 */

import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

/**
 * Crée un middleware de validation pour les requêtes HTTP
 * @param {AnyZodObject | ZodEffects<AnyZodObject>} schema - Schéma de validation Zod
 * @returns {Function} Middleware Express qui valide les données de la requête
 * @throws {400} Si la validation échoue
 */
export const validate = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      req.body = parsed.body ?? req.body;
      req.query = parsed.query ?? req.query;
      req.params = parsed.params ?? req.params;
      next();
    } catch (error) {
      res.status(400).json({ erreur: error.errors[0].message });
    }
  };
};
