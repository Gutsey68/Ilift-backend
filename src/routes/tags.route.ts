import { Router } from 'express';
import { createTagHandler, getTagsHandler, updateTagHandler } from '../controllers/tags.controller';
import { protect } from '../middlewares/protect';

const tagsRoutes = Router();

tagsRoutes.get('/', protect, getTagsHandler);

tagsRoutes.post('/', protect, createTagHandler);
tagsRoutes.put('/:id', protect, updateTagHandler);
tagsRoutes.delete('/:id', protect, createTagHandler);

export default tagsRoutes;
