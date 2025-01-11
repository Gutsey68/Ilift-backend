import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

export const findCityByName = async (name: string) => {
  const city = await prisma.city.findFirst({
    where: { name },
    select: {
      id: true,
      name: true
    }
  });

  if (!city) {
    throw AppError.NotFound('Ville non trouvée', ErrorCodes.NOT_FOUND);
  }

  return city;
};
