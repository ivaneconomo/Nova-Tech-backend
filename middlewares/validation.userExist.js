const User = require('../models/users.model');

const emailValidation = async (email) => {
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new Error(`El email "${email}" ya se encuentra en uso.`);
  }
  return false;
};

const editEmailValidation = async (value, { req }) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    throw new Error('El usuario no existe');
  }

  const existingUser = await User.findOne({ email: value });
  if (existingUser && existingUser._id.toString() !== id) {
    throw new Error('El email ya está en uso por otro usuario');
  }

  return false;
};

module.exports = {
  emailValidation,
  editEmailValidation,
};
