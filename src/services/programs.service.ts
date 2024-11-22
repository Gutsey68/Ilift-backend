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

export const getWorkoutById = async (id: string) => {
  return await prisma.workouts.findUnique({
    where: {
      id
    },
    select: {
      name: true,
      id: true,
      program: {
        select: {
          name: true,
          id: true
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
    orderBy: {
      createdAt: 'asc'
    }
  });
};
