const User = require('../models/users.model.js');

const createNewUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

module.exports = {
  createNewUser,
};


