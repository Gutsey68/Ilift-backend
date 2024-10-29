import prisma from '../database/db';

export const getPrograms = async () => {
  return await prisma.programs.findMany();
};
