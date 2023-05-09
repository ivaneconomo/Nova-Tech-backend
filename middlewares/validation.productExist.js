const Product = require('../models/products.model');

const productValidation = async (titleEs) =>{
  const isExist = await Product.find({titleEs});
  if(isExist.length !== 0) throw new Error(`El producto ${titleEs} ya se encuentra registrado`);
  return false;
};

const offertProdValidate = async(req,res, next)=>{
  try {
    const cant = await Product.find({offert: true});
    if(cant.length > 8) return res.status(404).json("ya se supero el limite de ofertas");
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports={
  productValidation,
  offertProdValidate
}