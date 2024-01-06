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
productsRouter.get("/", getAllProducts);
productsRouter.get("/product_by_id/:id", getProductById);
productsRouter.put("/:id", updateProductById);
productsRouter.delete("/:id", deleteProductById);
productsRouter.get("/products_by_store/:id", getProductsByStore);

module.exports = productsRouter;
