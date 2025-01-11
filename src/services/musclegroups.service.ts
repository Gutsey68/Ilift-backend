import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

export const getAllMuscleGroups = async () => {
  const muscleGroups = await prisma.muscleGroups.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  if (!muscleGroups.length) {
    throw AppError.NotFound('Aucun groupe musculaire trouvé', ErrorCodes.NOT_FOUND);
  }

  return muscleGroups;
};
