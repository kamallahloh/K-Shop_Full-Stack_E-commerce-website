const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/products");

// define router
const productsRouter = express.Router();

productsRouter.post("/", addProduct);
productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.put("/:id", updateProductById);
productsRouter.delete("/:id", deleteProductById);

module.exports = productsRouter;
