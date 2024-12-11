import { Router } from 'express';
import { createTagHandler, deleteTagHandler, getTagsHandler, updateTagHandler } from '../controllers/tags.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createTagSchema, updateTagSchema, deleteTagSchema } from '../validators/tags.validation';

const tagsRoutes = Router();

tagsRoutes.get('/', protect, getTagsHandler);
tagsRoutes.post('/', protect, validate(createTagSchema), createTagHandler);
tagsRoutes.delete('/:id', protect, validate(deleteTagSchema), deleteTagHandler);
tagsRoutes.put('/:id', protect, validate(updateTagSchema), updateTagHandler);

export default tagsRoutes;
