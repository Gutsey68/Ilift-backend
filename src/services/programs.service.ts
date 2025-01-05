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
      position: 'asc'
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
      id: true,
      author: {
        select: {
          id: true
        }
      },
      usersFollows: {
        select: {
          userId: true
        }
      }
    }
  });
};

export const getWorkoutsOfProgram = async (programId: string) => {
  return await prisma.workouts.findMany({
    where: {
      programId
    },
    orderBy: {
      position: 'asc'
    }
  });
};

export const createProgram = async (name: string, description: string, authorId: string) => {
  const maxPosition = await prisma.programs.aggregate({
    where: { authorId },
    _max: { position: true }
  });

  const position = (maxPosition._max.position || 0) + 1;

  return await prisma.programs.create({
    data: {
      name,
      description,
      authorId,
      position
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
