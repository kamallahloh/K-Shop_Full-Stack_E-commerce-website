const express = require("express");

// Import roles controller
const { getAllRoles, createNewRole } = require("../controllers/roles");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Create roles router
const rolesRouter = express.Router();

rolesRouter.get(
  "/",
  authentication,
  authorization("MANAGE-ROLES"),
  getAllRoles
);

rolesRouter.post(
  "/",
  authentication,
  authorization("MANAGE-ROLES"),
  createNewRole
);

module.exports = rolesRouter;
