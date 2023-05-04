const { creProdServices, getAllProd, getProdById, editProd, getProdSearch, getProdOffert, deleteProd, getProd, getOffert, getProdCate } = require("../services/products.services");
const cloudinary = require('../helpers/cloudinary')

const getAllProducts = async (req, res) => {
  try {
    const resp = await getAllProd();
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getProducts = async(req,res) =>{
  try {
    const { pag } = req.params;
    let index = 0;
    if(pag===1){
      index = 0;
    }else{
      index = (pag-1)*12;
    }
    const resp = await getProd(index);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const getProdCategory = async(req,res) =>{
  try {
    const { category } = req.params;
    const resp = await getProdCate(category);
    res.status(200).json(resp)
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await getProdById(id);
    if (!resp) return res.status(404).json("El producto no existe");
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getSearch = async(req,res)=>{
  try {
    const { title } = req.params;
    const query = {titleEs:{$regex: new RegExp(title, 'i')}};
    const resp = await getProdSearch(query);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const getOfferts = async (req,res)=>{
  try {
    const resp = await getProdOffert()
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    productData.price = parseInt(productData.price);
    productData.quantity = parseInt(productData.quantity);
    const resp = await creProdServices(productData);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const resp = await editProd(id, productData);
    if (!resp) return res.status(404).json("El producto no se ha encontrado");
    res.status(200).json({
      message: "El producto fue actualizado correctamente.",
      data: resp,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await deleteProd(id);
    if (!resp) return res.status(404).json("El producto no se ha encontrado");
    res.status(200).json({ message: "El producto se eliminó correctamente" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};


const productOffert = async(req,res)=>{
  try {
    const { id } = req.params;
    const productData = await getProdById(id);
    prod.offert = true;
    const resp = await editProd(id, productData);
    if (!resp) return res.status(404).json("El producto no se ha encontrado");
    res.status(200).json({message: "El producto fue ofertado correctamente.", data: resp});
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const restartOffert = async(req,res)=>{
  try {
    const productData = await getOffert();
    if(productOffert.length === 0) return res.status(404).json("No hay ofertas");
    productData.map((prod)=>{ prod.offert=false; });
    for(let i=0 ; i<productData.length; i++){
      await editProd(productData[i].id, productData[i])
    };
    res.status(200).json({message: "los productos fueron reiniciados en sus ofertas"});
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const uploadImageOne = async(req,res)=>{
  try {
    const {image} = req.body;
    const result = await cloudinary.uploader.upload(image, {
      folder: products
    })
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'No se pudo subir la imagen' });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
  productOffert,
  restartOffert,
  getProducts,
  getProdCategory,
  getSearch,
  getOfferts,
  uploadImageOne
};
