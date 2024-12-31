import prisma from '../database/db';

export const getAllMuscleGroups = async () => {
  return await prisma.muscleGroups.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      name: 'asc'
    }
  });
};
