import prisma from '../database/db';

export const getPrograms = async () => {
  return await prisma.programs.findMany();
};

export const getProgramsOfUser = async (userId: string) => {
  return await prisma.programs.findMany({
    where: {
      authorId: userId
    }
  });
};
