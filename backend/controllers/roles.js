const RoleModel = require("../models/roles");

// 1. this function return all roles
const getAllRoles = (req, res) => {
  RoleModel.find({})
    .then((results) => {
      if (results.length === 0) {
        console.log("No roles added");
        res.status(400).json("No roles added");
      } else {
        console.log("getAllRoles done");
        res.status(200).json({
          success: true,
          message: `getAllRoles done`,
          users: results,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("No roles added");
    });
};

// This function creates new role
const createNewRole = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new RoleModel({ role, permissions });
  newRole
    .save()
    .then((result) => {
      console.log(`Role created`);
      res.status(201).json({
        success: true,
        message: `Role created`,
        role: result,
      });
    })
    .catch((err) => {
      console.log(`Role creation Server Error`);
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = { getAllRoles, createNewRole };
