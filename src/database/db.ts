/**
 * @fileoverview Configuration et initialisation du client Prisma
 * Instance unique du client Prisma pour la connexion à la base de données
 */

import { PrismaClient } from '@prisma/client';

/**
 * Instance unique du client Prisma
 * Utilisée pour toutes les opérations de base de données dans l'application
 * @type {PrismaClient}
 */
const prisma = new PrismaClient();

export default prisma;
