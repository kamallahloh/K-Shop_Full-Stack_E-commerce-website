const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  registerUser,
  loginUser,
} = require("../controllers/users");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// define router
const usersRouter = express.Router();

usersRouter.get("/", authentication, authorization("SEE-USERS"), getAllUsers);

usersRouter.get(
  "/:id",
  authentication,
  authorization("SEE-USERS"),
  getUserById
);

usersRouter.put(
  "/:id",
  authentication,
  authorization("EDIT-USERS"),
  updateUserById
);

usersRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE-USERS"),
  deleteUserById
);

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);

module.exports = usersRouter;
