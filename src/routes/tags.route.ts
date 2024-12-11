import { Router } from 'express';
import { createTagHandler, deleteTagHandler, getTagsHandler, updateTagHandler } from '../controllers/tags.controller';
import { protect } from '../middlewares/protect';

const tagsRoutes = Router();

tagsRoutes.get('/', protect, getTagsHandler);
tagsRoutes.post('/', protect, createTagHandler);
tagsRoutes.delete('/:id', protect, deleteTagHandler);
tagsRoutes.put('/:id', protect, updateTagHandler);

export default tagsRoutes;
