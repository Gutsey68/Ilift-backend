import {
  createProgram,
  deleteProgram,
  getProgramById,
  getPrograms,
  getProgramsOfUser,
  getWorkoutsOfProgram,
  updateProgram
} from '../services/programs.service';
import { getUserById } from '../services/users.service';

export const getProgramsHandler = async (req, res) => {
  try {
    const programs = await getPrograms();

    if (!programs) {
      return res.status(404).json({ error: 'Programmes non trouvés' });
    }

    res.status(200).json({ message: 'Programmes récupérés avec succès', data: programs });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getProgramsOfUserHandler = async (req, res) => {
  try {
    const userId = req.params.id;

    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const programs = await getProgramsOfUser(userId);

    if (!programs) {
      return res.status(404).json({ error: 'Programmes non trouvés' });
    }

    res.status(200).json({ message: 'Programmes récupérés avec succès', data: programs });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getWorkoutsOfProgramHandler = async (req, res) => {
  try {
    const programId = req.params.id;

    const program = await getProgramById(programId);

    if (!program) {
      return res.status(404).json({ error: 'Programme non trouvé' });
    }

    const workouts = await getWorkoutsOfProgram(programId);

    if (!workouts) {
      return res.status(404).json({ error: 'Séances non trouvées' });
    }

    res.status(200).json({ message: 'Séances récupérées avec succès', data: { workouts, program } });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const createProgramHandler = async (req, res) => {
  try {
    const { name, description } = req.body;

    const authorId = req.user.id;

    const program = await createProgram(name, description, authorId);

    if (!program) {
      return res.status(404).json({ error: "Le programme n'a pas pu être créé" });
    }

    res.status(201).json({ message: 'Programme créé avec succès', data: program });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const updateProgramHandler = async (req, res) => {
  try {
    const programId = await getProgramById(req.params.id);

    if (!programId) {
      return res.status(404).json({ error: 'Programme non trouvé' });
    }

    const { name, description } = req.body;

    const program = await updateProgram(req.params.id, name, description);

    if (!program) {
      return res.status(404).json({ error: 'Programme non trouvé' });
    }

    res.status(200).json({ message: 'Programme mis à jour avec succès', data: program });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const deleteProgramHandler = async (req, res) => {
  try {
    const programId = await getProgramById(req.params.id);

    if (!programId) {
      return res.status(404).json({ error: 'Programme non trouvé' });
    }

    const deletedProgram = await deleteProgram(req.params.id);

    if (!deletedProgram) {
      return res.status(404).json({ error: 'Programme non trouvé' });
    }

    res.status(200).json({ message: 'Programme supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
