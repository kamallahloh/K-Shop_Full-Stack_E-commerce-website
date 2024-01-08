const express = require("express");
const {
  getAllCartProducts,
  deleteAllCartProducts,
  addProductToCart,
  // getCartProductById,
  // deleteProductFromCart,
  // moveProductToFav,
} = require("../controllers/carts");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// define router
const cartsRouter = express.Router();

cartsRouter.get(
  "/",
  authentication,
  authorization("MANAGE-CARTS"),
  getAllCartProducts
);

cartsRouter.delete(
  "/",
  authentication,
  authorization("MANAGE-CARTS"),
  deleteAllCartProducts
);

cartsRouter.post(
  "/:id",
  authentication,
  authorization("MANAGE-CARTS"),
  addProductToCart
);

// cartsRouter.get(
//   "/:id",
//   authentication,
//   authorization("MANAGE-CARTS"),
//   getCartProductById
// );

// cartsRouter.delete(
//   "/:id",
//   authentication,
//   authorization("MANAGE-CARTS"),
//   deleteProductFromCart
// );

// cartsRouter.put(
//   "/:id",
//   authentication,
//   authorization("MANAGE-CARTS"),
//   moveProductToFav
// );

module.exports = cartsRouter;
