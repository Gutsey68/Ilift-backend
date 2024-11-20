import prisma from '../database/db';

export const getTags = async () => {
  return await prisma.tags.findMany();
};
