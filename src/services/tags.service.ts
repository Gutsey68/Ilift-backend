import prisma from '../database/db';

export const getTags = async () => {
  return await prisma.tags.findMany({
    take: 10
  });
};

export const createTag = async (name: string) => {
  return await prisma.tags.create({
    data: {
      name
    }
  });
};

export const deleteTag = async (id: string) => {
  return await prisma.tags.delete({
    where: {
      id
    }
  });
};

export const updateTag = async (id: string, name: string) => {
  return await prisma.tags.update({
    where: {
      id
    },
    data: {
      name
    }
  });
};

export const getTagByName = async (name: string) => {
  return await prisma.tags.findFirst({
    where: {
      name
    }
  });
};

export const getTagById = async (id: string) => {
  return await prisma.tags.findFirst({
    where: {
      id
    }
  });
};
