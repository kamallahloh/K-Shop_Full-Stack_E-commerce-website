const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByStore,
} = require("../controllers/products");

// define router
const productsRouter = express.Router();

productsRouter.post("/", addProduct);
productsRouter.get("/", getAllProducts);
productsRouter.get("/search_2/:id", getProductById);
productsRouter.put("/:id", updateProductById);
productsRouter.delete("/:id", deleteProductById);
productsRouter.get("/search_1", getProductsByStore);

module.exports = productsRouter;
