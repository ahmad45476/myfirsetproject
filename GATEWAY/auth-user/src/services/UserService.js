const User = require('../models/User');

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getAllUsers = async () => {
  return await User.find().select('-password');
};

const getUserById = async (id) => {
  return await User.findById(id).select('-password');
};

const updateUser = async (id, newData) => {
  return await User.findByIdAndUpdate(id, newData, { new: true }).select('-password');
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
