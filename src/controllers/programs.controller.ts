import { getPrograms, getProgramsOfUser } from '../services/programs.service';

export const getProgramsHandler = async (req, res) => {
  try {
    const programs = await getPrograms();
    res.status(200).json({ message: 'Programmes récupérés avec succès', data: programs });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getProgramsOfUserHandler = async (req, res) => {
  try {
    const userId = req.params.id;

    const programs = await getProgramsOfUser(userId);

    if (!programs) {
      return res.status(404).json({ error: 'Programmes non trouvés' });
    }

    res.status(200).json({ message: 'Programmes récupérés avec succès', data: programs });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
