import prisma from '../database/db';

export const getPrograms = async () => {
  return await prisma.programs.findMany();
};

export const getProgramsOfUser = async (userId: string) => {
  return await prisma.programs.findMany({
    where: {
      authorId: userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getWorkoutsOfProgram = async (programId: string) => {
  return await prisma.workouts.findMany({
    where: {
      programId
    },
    include: {
      program: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      id: 'asc'
    }
  });
};
