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
