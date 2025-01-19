/**
 * @fileoverview Extensions de types pour Express
 * Ajoute des propriétés personnalisées à l'objet Request d'Express
 */

declare global {
  namespace Express {
    /**
     * Extension de l'interface Request d'Express
     * @interface Request
     */
    interface Request {
      /**
       * Données de l'utilisateur authentifié
       * @property {object} user
       */
      user?: {
        id: string;
        pseudo: string;
        email?: string;
        roleId?: string;
        iat?: number;
        exp?: number;
      };

      /**
       * Données du payload du refresh token
       * @property {object} refreshPayload
       */
      refreshPayload?: {
        id: string;
        pseudo: string;
        email?: string;
        roleId?: string;
        iat?: number;
        exp?: number;
      };

      /**
       * Fichier unique uploadé via Multer
       * @property {Express.Multer.File} file
       */
      file?: Express.Multer.File;

      /**
       * Multiple fichiers uploadés via Multer
       * @property {Express.Multer.File[]} files
       */
      files?: Express.Multer.File[];
    }
  }
}

export {};
