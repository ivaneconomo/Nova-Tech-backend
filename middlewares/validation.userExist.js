const User = require('../models/users.model');

const emailValidation = async (email) => {
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new Error(`El email "${email}" ya se encuentra en uso.`);
  }
  return false;
};

module.exports = {
  emailValidation,
};
