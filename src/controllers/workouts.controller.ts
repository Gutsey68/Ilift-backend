import { createWorkout, deleteWorkout, getExercicesOfWorkout, getWorkoutById, updateWorkout } from '../services/workouts.service';

export const getExercicesOfWorkoutHandler = async (req, res) => {
  try {
    const workoutId = req.params.id;

    const workout = await getWorkoutById(workoutId);

    const exercices = await getExercicesOfWorkout(workoutId);

    if (!exercices) {
      return res.status(404).json({ error: 'Exercices non trouvés' });
    }

    res.status(200).json({ message: 'Exercices récupérés avec succès', data: { exercices, workout } });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const createWorkoutHandler = async (req, res) => {
  try {
    const { name, programId } = req.body;
    const userId = req.user.id;

    const workout = await createWorkout(name, programId, userId);

    res.status(201).json({ message: 'Séance créée avec succès', data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const updateWorkoutHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const workoutId = req.params.id;

    const workout = await updateWorkout(workoutId, name);

    res.status(200).json({ message: 'Séance modifiée avec succès', data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const deleteWorkoutHandler = async (req, res) => {
  try {
    const workoutId = req.params.id;

    await deleteWorkout(workoutId);

    res.status(200).json({ message: 'Séance supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
