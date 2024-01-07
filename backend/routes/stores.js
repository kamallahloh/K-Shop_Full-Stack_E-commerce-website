const express = require("express");
const {
  getAllStores,
  getStoreById,
  updateStoreById,
  deleteStoreById,
  registerStore,
  loginStore,
} = require("../controllers/stores");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// define router
const storesRouter = express.Router();

storesRouter.get(
  "/",
  authentication,
  authorization("SEE-STORES"),
  getAllStores
);

storesRouter.get(
  "/:id",
  authentication,
  authorization("SEE-STORES"),
  getStoreById
);

storesRouter.put(
  "/:id",
  authentication,
  authorization("EDIT-STORES"),
  updateStoreById
);

storesRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE-STORES"),
  deleteStoreById
);

storesRouter.post("/register", registerStore);
storesRouter.post("/login", loginStore);

module.exports = storesRouter;
