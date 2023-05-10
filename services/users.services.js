const User = require('../models/users.model');

const saveUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const findUsers = async () => {
  return await User.find({}).select('-password -__v');
};

const findUser = async (id) => {
  return await User.findById(id).select('-password -__v');
};

const updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData).select('-password -__v');
};

const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  saveUser,
  findUsers,
  findUser,
  updateUser,
  deleteUserById,
};
