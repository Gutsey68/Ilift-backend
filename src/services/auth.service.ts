import prisma from '../database/db';
import { hashPassword } from '../utils/hash';
import { registerSchema } from '../validators/schemas';

export const createUser = async (pseudo: string, password: string, email: string) => {
  registerSchema.parse({ pseudo, password, email, confirmPassword: password });
  const passwordHash = await hashPassword(password);
  return await prisma.user.create({
    data: {
      pseudo,
      passwordHash,
      email
    }
  });
};
