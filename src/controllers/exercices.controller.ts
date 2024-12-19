import {
  createExercice,
  deleteExercice,
  getExerciceAndResults,
  getExerciceByIdWithoutResults,
  getExercices,
  getWorkoutById,
  updateExercice
} from '../services/exercices.service';

export const getExerciceAndResultsHandler = async (req, res) => {
  try {
    const workoutId = req.params.id;

    const workout = await getWorkoutById(workoutId);

    if (!workout) {
      return res.status(404).json({ error: 'Workout non trouvé' });
    }

    const exercices = await getExerciceAndResults(workoutId);

    if (!exercices) {
      return res.status(404).json({ error: 'Exercices non trouvés' });
    }

    res.status(200).json({ message: 'Exercices récupérés avec succès', data: { exercices, workout } });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getExercicesHandler = async (req, res) => {
  try {
    const exercices = await getExercices();

    if (!exercices) {
      return res.status(404).json({ error: 'Exercices non trouvés' });
    }

    res.status(200).json({ message: 'Exercices récupérés avec succès', data: exercices });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const createExerciceHandler = async (req, res) => {
  try {
    const data = req.body;

    const exercice = await createExercice(data);

    if (!exercice) {
      return res.status(404).json({ error: 'Erreur lors de la création de message' });
    }

    res.status(201).json({ message: 'Exercice créé avec succès', data: exercice });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const updateExerciceHandler = async (req, res) => {
  try {
    const exerciceId = req.params.id;

    const existingExercice = await getExerciceByIdWithoutResults(exerciceId);

    if (!existingExercice) {
      return res.status(404).json({ error: 'Exercice non trouvé' });
    }

    const data = req.body;

    const exercice = await updateExercice(exerciceId, data);

    if (!exercice) {
      return res.status(404).json({ error: 'Exercice non trouvé' });
    }

    res.status(200).json({ message: 'Exercice mis à jour avec succès', data: exercice });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const deleteExerciceHandler = async (req, res) => {
  try {
    const exerciceId = req.params.id;

    const existingExercice = await getExerciceByIdWithoutResults(exerciceId);

    if (!existingExercice) {
      return res.status(404).json({ error: 'Exercice non trouvé' });
    }

    const deletedExercice = await deleteExercice(exerciceId);

    if (!deletedExercice) {
      return res.status(404).json({ error: "L'éxercice n'a pas pus être supprimé" });
    }

    res.status(200).json({ message: 'Exercice supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
