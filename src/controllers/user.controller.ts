import prisma from '../database/db';

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json({ data: users });
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  });

  res.status(200).json({ data: user });
};

export const createUser = async (req, res) => {};
export const updateUser = async (req, res) => {};
export const deleteUser = async (req, res) => {};
export const getFollowersByUserId = async (req, res) => {};
export const getFollowingByUserId = async (req, res) => {};
export const getSuggestions = async (req, res) => {};
export const followUser = async (req, res) => {};
