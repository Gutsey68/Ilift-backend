import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

type UpdateProgramData = {
  name?: string;
  description?: string;
  position?: number;
};

export const getPrograms = async () => {
  const programs = await prisma.programs.findMany();
  if (!programs.length) {
    throw AppError.NotFound('Aucun programme trouvé', ErrorCodes.PROGRAM_NOT_FOUND);
  }
  return programs;
};

export const getProgramsOfUser = async (authorId: string) => {
  const programs = await prisma.programs.findMany({
    where: { authorId },
    orderBy: { position: 'asc' }
  });

  if (!programs.length) {
    throw AppError.NotFound('Aucun programme trouvé pour cet utilisateur', ErrorCodes.PROGRAM_NOT_FOUND);
  }
  return programs;
};

export const getProgramById = async (id: string) => {
  const program = await prisma.programs.findUnique({
    where: { id },
    select: {
      name: true,
      id: true,
      author: { select: { id: true } },
      usersFollows: { select: { userId: true } }
    }
  });

  if (!program) {
    throw AppError.NotFound('Programme non trouvé', ErrorCodes.PROGRAM_NOT_FOUND);
  }
  return program;
};

export const getWorkoutsOfProgram = async (programId: string) => {
  return await prisma.workouts.findMany({
    where: {
      programId
    },
    orderBy: {
      position: 'asc'
    }
  });
};

export const createProgram = async (name: string, description: string, authorId: string) => {
  try {
    const maxPosition = await prisma.programs.aggregate({
      where: { authorId },
      _max: { position: true }
    });

    const position = (maxPosition._max.position || 0) + 1;

    return await prisma.programs.create({
      data: { name, description, authorId, position }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw AppError.BadRequest('Erreur lors de la création du programme', ErrorCodes.BAD_REQUEST);
    }
    throw error;
  }
};

export const updateProgram = async (id: string, data: UpdateProgramData) => {
  try {
    return await prisma.programs.update({
      where: { id },
      data
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Programme non trouvé', ErrorCodes.PROGRAM_NOT_FOUND);
      }
    }
    throw error;
  }
};

export const deleteProgram = async (id: string) => {
  try {
    return await prisma.programs.delete({
      where: { id }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Programme non trouvé', ErrorCodes.PROGRAM_NOT_FOUND);
      }
    }
    throw error;
  }
};
