import { getPrograms } from '../services/programs.service';

export const getProgramsHandler = async (req, res) => {
  try {
    const programs = await getPrograms();
    res.status(200).json({ message: 'Programmes récupérés avec succès', data: programs });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
