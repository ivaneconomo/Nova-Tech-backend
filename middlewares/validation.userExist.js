const User = require('../models/user.model');

const emailValidation = async (email) => {
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new Error(`El email "${email}" ya se encuentra en uso.`);
  }
  return false;
};

const verifyClient = async (role) =>{
  if(role === undefined || role === null) return false;
  if(role !== 'client') throw new Error('No puede ser un administrador');
  return false;
} // borrar ?

module.exports={
  emailValidation,
  verifyClient
}