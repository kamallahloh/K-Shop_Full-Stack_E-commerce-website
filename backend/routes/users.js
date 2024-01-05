const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  register,
  login,
} = require("../controllers/users");

// define router
const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.put("/:id", updateUserById);
usersRouter.delete("/:id", deleteUserById);
usersRouter.post("/register", register);
usersRouter.post("/login", login);

module.exports = usersRouter;
