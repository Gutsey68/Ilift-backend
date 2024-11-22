import prisma from '../database/db';

export const getExerciceAndResults = async (id: string) => {
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
