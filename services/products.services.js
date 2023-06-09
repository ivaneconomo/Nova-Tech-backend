const Products = require("../models/products.model");
const { Storage } = require('@google-cloud/storage');

const getAllProd = async () => {
  return await Products.find({});
};

const getProd = async (index) =>{
  return await Products.find({}, "-descriptionEs -descriptionEn -img -quantity").skip(index).limit(12);
};

const getProdCate = async(category)=>{
  return await Products.find({category: category}, "-descriptionEs -descriptionEn -img -quantity");
}

const getProdById = async (id) => {
  return await Products.findById(id);
};

const getProdSearch = async (query)=>{
  return await Products.find(query, "-descriptionEs -descriptionEn -img -quantity");
}

const getProdOffert = async ()=>{
  return await Products.find({offert: true}, "-descriptionEs -descriptionEn -img -quantity");
}

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

const getOffert = async()=>{
  return await Products.find({offert: true});
}


module.exports = {
  creProdServices,
  getAllProd,
  getProdById,
  editProd,
  deleteProd,
  getProd,
  getOffert,
  getProdCate,
  getProdSearch,
  getProdOffert
};
