const { Router } = require("express");
const routeProduct = Router();
const { createProduct, getAllProducts, getProductById, editProduct, deleteProduct, getSearch, getProdCategory, productOffert, restartOffert, getProducts} = require("../controllers/products.controller");
const { body } = require("express-validator");
const { productValidation, offertProdValidate } = require("../middlewares/validation.productExist");
const { jwtValidator, jwtValidatorAdmin} = require("../middlewares/jwtValidation");

routeProduct.get("/get-all-products", jwtValidatorAdmin, getAllProducts);

routeProduct.get("/get-products/:pag", getProducts);

routeProduct.get("/get-product-category/:category", getProdCategory)

routeProduct.get("/get-product-by-id/:id",jwtValidator, getProductById);

routeProduct.get("/search-product/:title", getSearch);

routeProduct.patch("/edit-product/:id", jwtValidatorAdmin, editProduct);

routeProduct.delete("/delete-product/:id", jwtValidatorAdmin, deleteProduct);

routeProduct.post("/create-product",
  body("title").isString().withMessage("No es un titulo valido").not().isEmpty().withMessage("El campo está vacío").custom(productValidation),
  body("description").isString().withMessage("No es una descripcion valida").not().isEmpty().withMessage("El campo está vacío"),
  body("img").isArray().withMessage("No es un array de imagenes").not().isEmpty().withMessage("El campo está vacío"),
  body("icon").isString().withMessage("No es valido").not().isEmpty().withMessage("El campo está vacío"),
  body("price").isNumeric().withMessage("No es Numerico").not().isEmpty().withMessage("El campo está vacío"),
  body("category").isString().withMessage("No esta definida la categoria").not().isEmpty().withMessage("El campo está vacío"),
  jwtValidatorAdmin,
  createProduct
);

routeProduct.patch("/offert-product/:id", jwtValidatorAdmin, offertProdValidate, productOffert);

routeProduct.patch("/restart-offert",jwtValidatorAdmin, restartOffert);



module.exports = routeProduct;
