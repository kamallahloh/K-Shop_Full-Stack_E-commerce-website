const express = require("express");
const { getAllUsers, register, login } = require("../controllers/users");

// define router
const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/register", register);
usersRouter.post("/login", login);

module.exports = usersRouter;
