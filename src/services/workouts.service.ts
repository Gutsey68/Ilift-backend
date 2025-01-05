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
    include: {
      musclesGroups: {
        include: {
          muscleGroups: true
        }
      }
    },
    orderBy: {
      position: 'asc'
    }
  });
};

export const createWorkout = async (name: string, programId: string, userId: string) => {
  const maxPosition = await prisma.workouts.aggregate({
    where: { programId },
    _max: { position: true }
  });

  const position = (maxPosition._max.position || 0) + 1;

  return await prisma.workouts.create({
    data: {
      name,
      programId,
      userId,
      position
    }
  });
};

type UpdateWorkoutData = {
  name?: string;
  position?: number;
};

export const updateWorkout = async (id: string, data: UpdateWorkoutData) => {
  return await prisma.workouts.update({
    where: { id },
    data
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
  await prisma.workoutsExercises.deleteMany({
    where: {
      workoutId
    }
  });

  await prisma.workoutsExercises.createMany({
    data: exerciceIds.map((exerciceId, index) => ({
      workoutId,
      exerciceId,
      position: index + 1
    }))
  });

  return await getExercicesOfWorkout(workoutId);
};
