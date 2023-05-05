
const User= require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const login= async (req,res)=>{
  const {email,password}=req.body;
  try {
    const searchEmail=await User.findOne({email});
    if(!searchEmail) {
      console.log('el email o contraseñam son incorrectos');
      return res.status(404).json('el email o contraseña son incorrectos');}
    const passwordMatch= await bcrypt.compareSync(password,searchEmail.password);
    if(!passwordMatch){
      console.log('el email o contraseña son incorrectos');
      return res.status(404).json('el email o contraseñac son incorrectos');}
// una vez que pasa la logica para asegurar la existencia del usuario uso jwt

    const payload={
      id: searchEmail._id,
      email: searchEmail.email,
      roleAdmin: searchEmail.roleAdmin,
    }

    const token= jwt.sign(payload,process.env.SECRET,{
      expiresIn:1200,
    });

    res.status(200).json({msg:'Login exitoso',token});
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error);
  }
}

module.exports={
  login
};