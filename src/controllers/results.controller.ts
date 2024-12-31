import { createResult, deleteResult, getResultById, updateResult } from '../services/results.service';

export const createResultHandler = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const result = await createResult(data, userId);

    if (!result) {
      return res.status(404).json({ error: 'Erreur lors de la création du résultat' });
    }

    res.status(201).json({ message: 'Résultat créé avec succès', data: result });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const updateResultHandler = async (req, res) => {
  try {
    const resultId = req.params.id;
    const data = req.body;

    const existingResult = await getResultById(resultId);

    if (!existingResult) {
      return res.status(404).json({ error: 'Résultat non trouvé' });
    }

    const result = await updateResult(resultId, data);

    if (!result) {
      return res.status(404).json({ error: 'Résultat non trouvé' });
    }

    res.status(200).json({ message: 'Résultat mis à jour avec succès', data: result });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const deleteResultHandler = async (req, res) => {
  try {
    const resultId = req.params.id;

    const existingResult = await getResultById(resultId);

    if (!existingResult) {
      return res.status(404).json({ error: 'Résultat non trouvé' });
    }

    const deletedResult = await deleteResult(resultId);

    if (!deletedResult) {
      return res.status(404).json({ error: "Le résultat n'a pas pu être supprimé" });
    }

    res.status(200).json({ message: 'Résultat supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
