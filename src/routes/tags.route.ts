import { Router } from 'express';
import { getTagsHandler } from '../controllers/tags.controller';
import { protect } from '../middlewares/protect';

const tagsRoutes = Router();

tagsRoutes.get('/', protect, getTagsHandler);

tagsRoutes.post('/', protect);
tagsRoutes.put('/:id', protect);
tagsRoutes.delete('/:id', protect);

export default tagsRoutes;
