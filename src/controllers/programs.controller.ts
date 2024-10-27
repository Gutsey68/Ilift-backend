import prisma from '../database/db';

export const getPrograms = async (req, res) => {
  const programs = await prisma.programs.findMany();

  res.status(200).json({ data: programs });
};

export const getProgramById = async (req, res) => {};
export const createProgram = async (req, res) => {};
export const updateProgram = async (req, res) => {};
export const deleteProgram = async (req, res) => {};
export const getProgramsByUserId = async (req, res) => {};
export const getProgramByAuthorId = async (req, res) => {};
