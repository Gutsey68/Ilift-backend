import { getExerciceAndResults } from '../services/exercices.service';

export const getExerciceAndResultsHandler = async (req, res) => {
  try {
    const workoutId = req.params.id;

    const exercices = await getExerciceAndResults(workoutId, req.user.id);

    if (!exercices) {
      return res.status(404).json({ error: 'Exercices non trouvés' });
    }

    res.status(200).json({ message: 'Exercices récupérés avec succès', data: exercices });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
