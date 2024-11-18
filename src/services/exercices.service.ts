import prisma from '../database/db';

export const getExerciceAndResults = async (id: string, userId: string) => {
  return await prisma.exercices.findUnique({
    where: {
      id
    },
    include: {
      results: {
        include: {
          sets: true,
          user: true
        }
      }
    }
  });
};
