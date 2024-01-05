const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// This function will getAllUsers

const getAllUsers = (req, res) => {
  usersModel
    .find({})
    .populate("role", "-_id -permissions -__v")
    .then((results) => {
      console.log(`getAllUsers done`);
      res.status(200).json({
        success: true,
        message: `getAllUsers done`,
        users: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//? getUserById  /////////////////////////////////

const getUserById = async (req, res) => {
  /* 
    postman params /:id ==>
    GET http://localhost:5000/users/6595c80555fc1e4be12e5bcc
  */
  const { id } = req.params;

  try {
    const findUser = await usersModel.findOne({ _id: id });
    console.log("findUser==>", findUser);
    if (findUser === null) {
      console.log(`No User found at id: ${id}`);
      res.status(404).json({
        success: false,
        message: `No user found at id: ${id}`,
      });
    } else {
      console.log({
        id: `The user id: ${id}`,
        user: findUser.userName,
      });
      res.status(200).json({
        success: true,
        message: findUser,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      err,
    });
  }
};

// This function creates a new user
const register = (req, res) => {
  const { userName, firstName, lastName, age, country, email, password, role } =
    req.body;
  const user = new usersModel({
    userName,
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `Error status:409 "Conflict" The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// This function checks user login credentials
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  usersModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          user: result.firstName,
          role: result.role,
          country: result.country,
        };

        const options = {
          expiresIn: "60m",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          // userId: result._id,
          // userName: result.firstName,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  register,
  login,
};
