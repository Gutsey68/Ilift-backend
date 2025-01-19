/**
 * @fileoverview Utilitaires de hachage pour les mots de passe
 * Utilise bcrypt pour le hachage et la comparaison sécurisée
 */

import * as bcrypt from 'bcrypt';

/**
 * Compare un mot de passe en clair avec un hash
 * @param {string} password - Mot de passe en clair à vérifier
 * @param {string} hash - Hash du mot de passe stocké
 * @returns {Promise<boolean>} True si les mots de passe correspondent
 */
export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

/**
 * Crée un hash sécurisé d'un mot de passe
 * @param {string} password - Mot de passe en clair à hacher
 * @returns {Promise<string>} Hash du mot de passe
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
