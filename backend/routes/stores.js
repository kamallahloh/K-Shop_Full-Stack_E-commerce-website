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

storesRouter.get("/:id", getStoreById);
storesRouter.put("/:id", updateStoreById);
storesRouter.delete("/:id", deleteStoreById);
storesRouter.post("/register", registerStore);
storesRouter.post("/login", loginStore);

module.exports = storesRouter;
