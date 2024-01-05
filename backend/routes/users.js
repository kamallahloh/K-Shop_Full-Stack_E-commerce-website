const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  registerUser,
  loginUser,
} = require("../controllers/users");

// define router
const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.put("/:id", updateUserById);
usersRouter.delete("/:id", deleteUserById);
usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);

module.exports = usersRouter;
