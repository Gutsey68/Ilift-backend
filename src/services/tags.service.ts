import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

export const getTags = async () => {
  const tags = await prisma.tags.findMany({
    take: 10
  });

  if (!tags.length) {
    throw AppError.NotFound('Aucun tag trouvé', ErrorCodes.NOT_FOUND);
  }

  return tags;
};

export const getTagByName = async (name: string) => {
  const tag = await prisma.tags.findFirst({
    where: { name }
  });
  return tag;
};

export const getTagById = async (id: string) => {
  const tag = await prisma.tags.findFirst({
    where: { id }
  });

  if (!tag) {
    throw AppError.NotFound('Tag non trouvé', ErrorCodes.NOT_FOUND);
  }

  return tag;
};

export const createTag = async (name: string) => {
  try {
    return await prisma.tags.create({
      data: { name }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw AppError.Conflict('Ce tag existe déjà', ErrorCodes.DUPLICATE_ENTRY);
      }
    }
    throw error;
  }
};

export const updateTag = async (id: string, name: string) => {
  try {
    return await prisma.tags.update({
      where: { id },
      data: { name }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw AppError.Conflict('Ce tag existe déjà', ErrorCodes.DUPLICATE_ENTRY);
      }
      if (error.code === 'P2025') {
        throw AppError.NotFound('Tag non trouvé', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

export const deleteTag = async (id: string) => {
  try {
    return await prisma.tags.delete({
      where: { id }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Tag non trouvé', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};
