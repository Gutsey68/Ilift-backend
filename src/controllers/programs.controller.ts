import { getPrograms } from '../services/programs.service';

export const getProgramsHandler = async (req, res) => {
  try {
    const programs = await getPrograms();
    res.status(200).json({ data: programs });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProgramById = async (req, res) => {};
export const createProgram = async (req, res) => {};
export const updateProgram = async (req, res) => {};
export const deleteProgram = async (req, res) => {};
export const getProgramsByUserId = async (req, res) => {};
export const getProgramByAuthorId = async (req, res) => {};
