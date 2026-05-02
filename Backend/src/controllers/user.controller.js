const prisma = require("../lib/prisma");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, address, phoneNumber, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        address,
        password,
      },
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({});
  return res.json(users);
};
const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { firstName, lastName, address, phoneNumber,password } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        firstName,
        lastName,
        address,
        phoneNumber,
        password,
      },
    });
    return res.status(201).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getUserbyId = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const deletedUser = await prisma.user.delete({
      where: {
        userId: userId,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  getUserbyId,
  deleteUser,
};
