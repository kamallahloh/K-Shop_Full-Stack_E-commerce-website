const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByStore,
} = require("../controllers/products");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// define router
const productsRouter = express.Router();

productsRouter.post(
  "/",
  authentication,
  authorization("ADD-PRODUCT"),
  addProduct
);

productsRouter.get(
  "/",
  authentication,
  authorization("SEE-PRODUCTS"),
  getAllProducts
);

productsRouter.get(
  "/product_by_id/:id",
  authentication,
  authorization("SEE-PRODUCTS"),
  getProductById
);

productsRouter.put(
  "/:id",
  authentication,
  authorization("EDIT-PRODUCT"),
  updateProductById
);

productsRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE-PRODUCT"),
  deleteProductById
);

productsRouter.get(
  "/products_by_store/",
  authentication,
  authorization("SEE-PRODUCTS"),
  getProductsByStore
);

module.exports = productsRouter;
