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

export const createProgram = async (name: string, description: string, authorId: string) => {
  return await prisma.programs.create({
    data: {
      name,
      description,
      authorId
    }
  });
};

export const updateProgram = async (id: string, name: string, description: string) => {
  return await prisma.programs.update({
    where: {
      id
    },
    data: {
      name,
      description
    }
  });
};

export const deleteProgram = async (id: string) => {
  return await prisma.programs.delete({
    where: {
      id
    }
  });
};
