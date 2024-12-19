import prisma from '../database/db';

export const getExerciceAndResults = async (id: string) => {
  return await prisma.exercices.findUnique({
    where: {
      id
    },
    include: {
      results: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          sets: {
            orderBy: {
              createdAt: 'asc'
            }
          },
          user: true
        }
      }
    }
  });
};

export const getWorkoutById = async (id: string) => {
  return await prisma.exercices.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      workouts: {
        select: {
          workout: {
            select: {
              id: true,
              name: true,
              program: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      }
    }
  });
};

export const getExerciceByIdWithoutResults = async id => {
  return await prisma.exercices.findUnique({
    where: {
      id
    },
    select: {
      id: true
    }
  });
};

export const getExercices = async () => {
  return await prisma.exercices.findMany();
};

export const createExercice = async data => {
  return await prisma.exercices.create({
    data
  });
};

export const updateExercice = async (id, data) => {
  return await prisma.exercices.update({
    where: {
      id
    },
    data
  });
};

export const deleteExercice = async id => {
  return await prisma.exercices.delete({
    where: {
      id
    }
  });
};
