import { getTags } from '../services/tags.service';

export const getTagsHandler = async (req, res) => {
  try {
    const tags = await getTags();

    res.status(200).json({ message: 'Tags récupérés avec succès', data: tags });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const createTagHandler = async (req, res) => {};

export const updateTagHandler = async (req, res) => {};

export const deleteTagHandler = async (req, res) => {};
