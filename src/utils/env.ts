/**
 * @fileoverview Utilitaire pour vérifier l'environnement d'exécution
 * Fournit un accès rapide au mode de production
 */

/**
 * Indique si l'application s'exécute en mode production
 * @type {boolean}
 */
export const isProd = process.env.NODE_ENV === 'production';
