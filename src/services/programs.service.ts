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

export const getExercicesOfWorkout = async (workoutId: string) => {
  return await prisma.exercices.findMany({
    where: {
      workouts: {
        some: {
          workoutId
        }
      }
    },
    include: {
      workouts: {
        select: {
          workout: {
            select: {
              name: true,
              id: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
};
