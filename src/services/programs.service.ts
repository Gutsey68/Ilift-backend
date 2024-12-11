import prisma from '../database/db';

export const getPrograms = async () => {
  return await prisma.programs.findMany();
};

export const getProgramsOfUser = async (authorId: string) => {
  return await prisma.programs.findMany({
    where: {
      authorId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getProgramById = async (id: string) => {
  return await prisma.programs.findUnique({
    where: {
      id
    },
    select: {
      name: true,
      id: true
    }
  });
};

export const getWorkoutsOfProgram = async (programId: string) => {
  return await prisma.workouts.findMany({
    where: {
      programId
    },
    orderBy: {
      id: 'asc'
    }
  });
};
