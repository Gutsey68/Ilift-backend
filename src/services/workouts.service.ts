import prisma from '../database/db';

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

export const getWorkoutByIdWithoutSelect = async (id: string) => {
  return await prisma.workouts.findUnique({
    where: {
      id
    },
    select: {
      id: true
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

export const createWorkout = async (name: string, programId: string, userId: string) => {
  return await prisma.workouts.create({
    data: {
      name,
      programId,
      userId
    }
  });
};

export const updateWorkout = async (id: string, name: string) => {
  return await prisma.workouts.update({
    where: {
      id
    },
    data: {
      name
    }
  });
};

export const deleteWorkout = async (id: string) => {
  return await prisma.workouts.delete({
    where: {
      id
    }
  });
};

export const updateWorkoutExercices = async (workoutId: string, exerciceIds: string[]) => {
  // D'abord supprimer toutes les relations existantes
  await prisma.workoutsExercises.deleteMany({
    where: {
      workoutId
    }
  });

  // Ensuite créer les nouvelles relations
  await prisma.workoutsExercises.createMany({
    data: exerciceIds.map(exerciceId => ({
      workoutId,
      exerciceId
    }))
  });

  return await getExercicesOfWorkout(workoutId);
};
