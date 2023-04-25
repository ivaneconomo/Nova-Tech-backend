const User = require('../models/user.model');

const emailValidation = async (email) =>{
  const isExist = await User.find({email});
  if(isExist.length !== 0) throw new Error(`El email ${email} ya se encuentra registrado`);
  return false;
};

const verifyClient = async (role) =>{
  if(role === undefined || role === null) return false;
  if(role !== 'client') throw new Error('No puede ser un administrador');
  return false;
}

module.exports={
  emailValidation,
  verifyClient
}