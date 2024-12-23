import prisma from '../database/db';

export const findCityByName = async (name: string) => {
  return await prisma.city.findFirst({
    where: { name },
    select: {
      id: true,
      name: true
    }
  });
};
