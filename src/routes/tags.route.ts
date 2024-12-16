import { Router } from 'express';
import { createTagHandler, deleteTagHandler, getTagsHandler, updateTagHandler } from '../controllers/tags.controller';
import { protect } from '../middlewares/protect';
import { validate } from '../middlewares/validate';
import { createTagSchema, deleteTagSchema, updateTagSchema } from '../validators/tags.validation';

const tagsRoutes = Router();

tagsRoutes.use(protect);

tagsRoutes.get('/', getTagsHandler);
tagsRoutes.post('/', validate(createTagSchema), createTagHandler);
tagsRoutes.delete('/:id', validate(deleteTagSchema), deleteTagHandler);
tagsRoutes.put('/:id', validate(updateTagSchema), updateTagHandler);

export default tagsRoutes;
