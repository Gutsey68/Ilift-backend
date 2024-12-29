import prisma from '../database/db';

export const createResult = async (data: any, userId: string) => {
  return await prisma.exerciceResults.create({
    data: {
      exerciceId: data.exerciceId,
      userId,
      sets: {
        createMany: {
          data: data.sets.map((set: any) => ({
            reps: set.reps,
            weight: set.weight
          }))
        }
      }
    },
    include: {
      sets: true
    }
  });
};

export const updateResult = async (id: string, data: any) => {
  await prisma.sets.deleteMany({
    where: { exerciceResultId: id }
  });

  return await prisma.exerciceResults.update({
    where: { id },
    data: {
      sets: {
        createMany: {
          data: data.sets.map((set: any) => ({
            reps: set.reps,
            weight: set.weight
          }))
        }
      }
    },
    include: {
      sets: true
    }
  });
};

export const deleteResult = async (id: string) => {
  return await prisma.exerciceResults.delete({
    where: { id }
  });
};

export const getResultById = async (id: string) => {
  return await prisma.exerciceResults.findUnique({
    where: { id }
  });
};
