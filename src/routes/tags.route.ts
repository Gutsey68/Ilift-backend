import { Router } from 'express';
import { getTagsHandler } from '../controllers/tags.controller';

const tagsRoutes = Router();

tagsRoutes.get('/', getTagsHandler);

export default tagsRoutes;
