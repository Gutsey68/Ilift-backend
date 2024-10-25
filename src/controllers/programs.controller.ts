import prisma from '../database/db';

export const getPrograms = async (req, res) => {
  const programs = await prisma.programs.findMany();

  res.status(200).json({ data: programs });
};
