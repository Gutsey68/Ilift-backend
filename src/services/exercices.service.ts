import prisma from '../database/db';

export const getExerciceAndResults = async (id: string, userId: string) => {
  return await prisma.exercices.findUnique({
    where: {
      id
    },
    include: {
      results: {
        where: {
          userId: userId
        },
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

export const getAllExercices = async () => {
  return await prisma.exercices.findMany({
    include: {
      musclesGroups: {
        include: {
          muscleGroups: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  });
};

export const getExercicesOfWorkout = async (workoutId: string) => {
  const workoutExercices = await prisma.workoutsExercises.findMany({
    where: { workoutId },
    include: {
      exercice: {
        include: {
          musclesGroups: {
            include: {
              muscleGroups: true
            }
          }
        }
      }
    },
    orderBy: {
      position: 'asc'
    }
  });

  return workoutExercices.map(we => ({
    ...we.exercice,
    position: we.position
  }));
};
