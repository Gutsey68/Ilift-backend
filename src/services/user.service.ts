import prisma from '../database/db';
import { hashPassword } from '../utils/hash';

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserProfile = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      pseudo: true,
      email: true,
      bio: true,
      createdAt: true,
      profilePhoto: true,
      roleId: true,
      city: {
        select: {
          name: true
        }
      }
    }
  });
};

export const findUserByPseudo = async (pseudo: string) => {
  return await prisma.user.findUnique({
    where: { pseudo }
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

export const createUser = async (pseudo: string, password: string, email: string) => {
  const passwordHash = await hashPassword(password);
  return await prisma.user.create({
    data: {
      pseudo,
      passwordHash,
      email
    }
  });
};
