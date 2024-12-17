import prisma from '../database/db';
import { hashPassword } from '../utils/hash';

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

export const saveRefreshToken = async (token: string, userId: string) => {
  await prisma.refreshToken.updateMany({
    where: { userId, isValid: true },
    data: { isValid: false }
  });

  return await prisma.refreshToken.create({
    data: {
      token,
      userId,
      isValid: true
    }
  });
};

export const findRefreshTokenByUserId = async (userId: string) => {
  return await prisma.refreshToken.findFirst({
    where: {
      userId,
      isValid: true
    }
  });
};

export const unvalidateRefreshToken = async (token: string) => {
  return await prisma.refreshToken.updateMany({
    data: {
      isValid: false
    },
    where: {
      token
    }
  });
};

export const FindRefreshToken = async (token: string) => {
  return await prisma.refreshToken.findFirst({
    where: {
      token
    }
  });
};
