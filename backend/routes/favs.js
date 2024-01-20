const express = require("express");
const {
  getAllFavProducts,
  deleteAllFavProducts,
  addProductToFav,
  getFavProductById,
  updateQuantity,
  deleteProductFromFav,
  // moveProductToFav,
} = require("../controllers/favs");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// define router
const favsRouter = express.Router();

favsRouter.get(
  "/",
  authentication,
  authorization("MANAGE-FAVS"),
  getAllFavProducts
);

favsRouter.delete(
  "/",
  authentication,
  authorization("MANAGE-FAVS"),
  deleteAllFavProducts
);

favsRouter.post(
  "/:id",
  authentication,
  authorization("MANAGE-FAVS"),
  addProductToFav
);

favsRouter.get(
  "/:id",
  authentication,
  authorization("MANAGE-FAVS"),
  getFavProductById
);

favsRouter.put(
  "/:id",
  authentication,
  authorization("MANAGE-FAVS"),
  updateQuantity
);

favsRouter.delete(
  "/:id",
  authentication,
  authorization("MANAGE-FAVS"),
  deleteProductFromFav
);

// favsRouter.put(
//   "/:id",
//   authentication,
//   authorization("MANAGE-FAVS"),
//   moveProductToFav
// );

module.exports = favsRouter;
