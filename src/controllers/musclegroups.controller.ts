import { getAllMuscleGroups } from '../services/musclegroups.service';

export const getMuscleGroupsHandler = async (req, res) => {
  try {
    const muscleGroups = await getAllMuscleGroups();

    if (!muscleGroups) {
      return res.status(404).json({ error: 'Groupes musculaires non trouvés' });
    }

    res.status(200).json({
      message: 'Groupes musculaires récupérés avec succès',
      data: muscleGroups
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
