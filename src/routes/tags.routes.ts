/**
 * @fileovview Configuration des routes pour les tags
 * Définit les endpoints protégés pour la gestion des tags
 */

import { Router } from 'express';
import { createTagHandler, deleteTagHandler, getTagsHandler, updateTagHandler } from '../controllers/tags.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createTagSchema, deleteTagSchema, updateTagSchema } from '../validators/tags.validation';

/**
 * Router Express pour les tags
 * @route GET /api/tags - Liste tous les tags
 * @route POST /api/tags - Crée un nouveau tag
 * @route DELETE /api/tags/:id - Supprime un tag
 * @route PUT /api/tags/:id - Modifie un tag existant
 */
const tagsRoutes = Router();

tagsRoutes.use(protect);

tagsRoutes.get('/', getTagsHandler);
tagsRoutes.post('/', validate(createTagSchema), createTagHandler);
tagsRoutes.delete('/:id', validate(deleteTagSchema), deleteTagHandler);
tagsRoutes.put('/:id', validate(updateTagSchema), updateTagHandler);

export default tagsRoutes;
