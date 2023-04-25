const Products = require("../models/products.model");

const getAllProd = async () => {
  return await Products.find({}, "-description -img -quantity");
};

const getProdById = async (id) => {
  return await Products.findById(id);
};

const creProdServices = async (productData) => {
  const newProduct = new Products(productData);
  return await newProduct.save();
};

const editProd = async (id, productData) => {
  return await Products.findByIdAndUpdate(id, productData);
};

const deleteProd = async (id) => {
  return await Products.findByIdAndDelete(id);
};

const getProdInfo = async(id)=>{
  return await Products.findById(id);
}

const getOffert = async()=>{
  return await Products.find({offert: true});
}

module.exports = {
  creProdServices,
  getAllProd,
  getProdById,
  editProd,
  deleteProd,
  getProdInfo,
  getOffert
};
