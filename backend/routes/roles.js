const express = require("express");

// Import roles controller
const { getAllRoles, createNewRole } = require("../controllers/roles");

// Create roles router
const rolesRouter = express.Router();

rolesRouter.get("/", getAllRoles);
rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;
