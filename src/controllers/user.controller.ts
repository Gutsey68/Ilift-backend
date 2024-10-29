import { getUserById, getUsers } from '../services/user.service';

export const getUsersHandler = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createUser = async (req, res) => {};
export const updateUser = async (req, res) => {};
export const deleteUser = async (req, res) => {};
export const getFollowersByUserId = async (req, res) => {};
export const getFollowingByUserId = async (req, res) => {};
export const getSuggestions = async (req, res) => {};
export const followUser = async (req, res) => {};
