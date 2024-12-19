import { createTag, deleteTag, getTagById, getTagByName, getTags, updateTag } from '../services/tags.service';

export const getTagsHandler = async (req, res) => {
  try {
    const tags = await getTags();

    if (!tags) {
      return res.status(404).json({ error: 'Aucun tag trouvé' });
    }

    res.status(200).json({ message: 'Tags récupérés avec succès', data: tags });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const createTagHandler = async (req, res) => {
  try {
    const existingTag = await getTagByName(req.body.name);

    if (existingTag) {
      return res.status(400).json({ error: 'Ce tag existe déjà' });
    }

    const { name } = req.body;

    const tag = await createTag(name);

    if (!tag) {
      return res.status(400).json({ error: 'Erreur lors de la création du tag' });
    }

    res.status(201).json({ message: 'Tag créé avec succès', data: tag });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const deleteTagHandler = async (req, res) => {
  try {
    const currentTag = await getTagById(req.params.id);

    if (!currentTag) {
      return res.status(404).json({ error: 'Tag non trouvé' });
    }

    const { id } = req.params;

    const deletedTag = await deleteTag(id);

    if (!deletedTag) {
      return res.status(400).json({ error: 'Erreur lors de la suppression du tag' });
    }

    res.status(200).json({ message: 'Tag supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const updateTagHandler = async (req, res) => {
  try {
    const existingTag = await getTagByName(req.body.name);

    if (existingTag) {
      return res.status(400).json({ error: 'Ce tag existe déjà' });
    }

    const currentTag = await getTagById(req.params.id);

    if (!currentTag) {
      return res.status(404).json({ error: 'Tag non trouvé' });
    }

    const { id } = req.params;
    const { name } = req.body;

    const updatedTag = await updateTag(id, name);

    if (!updatedTag) {
      return res.status(400).json({ error: 'Erreur lors de la modification du tag' });
    }

    res.status(200).json({ message: 'Tag modifié avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
