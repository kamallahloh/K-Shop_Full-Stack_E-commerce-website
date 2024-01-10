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

const getUserById = (req, res) => {
  /* 
    postman params /:id ==>
    GET http://localhost:5000/users/6595c80555fc1e4be12e5bcc
  */
  const userId = req.params.id;

  //* check the user account ownership before update it.
  usersModel
    .findById(userId)
    .then(async (result) => {
      if (
        result.id.toString() === req.token.userId ||
        req.token.role.role === "admin"
      ) {
        try {
          const foundUser = await usersModel.findOne({ _id: userId });
          console.log("foundUser ==>", foundUser);
          if (foundUser === null) {
            console.log(`No User found at id: ${userId}`);
            res.status(404).json({
              success: false,
              message: `No user found at id: ${userId}`,
            });
          } else {
            console.log(`user id: ${userId} has been found
            by: ${
              req.token.role.role === "admin"
                ? "admin"
                : ` the owner id: ${req.token.userId}`
            }`);
            res.status(200).json({
              success: true,
              message: foundUser,
            });
          }
        } catch (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "usersModel.findOne({ _id: userId } Server Error",
            err,
          });
        }
      } else {
        console.log("You are not the user account owner");
        res.status(500).json({
          success: false,
          message: "You are not the user account owner",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: " .findById(userId) Server Error",
        err,
      });
    });
};

//? updateUserById  /////////////////////////////////

const updateUserById = (req, res) => {
  /* 
    postman params /:id ==>
    PUT http://localhost:5000/users/6595c80555fc1e4be12e5bcc

    req.body:
{
    "firstName": "user edited",
    "age": 100
}
  */

  const userId = req.params.id;
  // console.log("req.token.userId", req.token.userId);

  let {
    userName,
    firstName,
    lastName,
    phoneNumber,
    age,
    country,
    email,
    userCart,
    userFav,
    // password,
    // role,
  } = req.body;

  //* check the user account ownership before update it.
  usersModel
    .findById(userId)
    .then(async (result) => {
      if (
        result.id.toString() === req.token.userId ||
        req.token.role.role === "admin"
      ) {
        try {
          const findUser = await usersModel.findByIdAndUpdate(userId, {
            userName,
            firstName,
            lastName,
            phoneNumber,
            age,
            country,
            email,
            userCart,
            userFav,
            // password,
            // role,
          });

          let updatedUser = {
            userName: userName ? userName : findUser.userName,
            firstName: firstName ? firstName : findUser.firstName,
            lastName: lastName ? lastName : findUser.lastName,
            phoneNumber: phoneNumber ? phoneNumber : findUser.phoneNumber,
            age: age ? age : findUser.age,
            country: country ? country : findUser.country,
            email: email ? email : findUser.email,
            userCart: userCart ? userCart : findUser.userCart,
            userFav: userFav ? userFav : findUser.userFav,

            // password: password ? password : findUser.password,
            // role: role ? role : findUser.role,
          };

          console.log(`Updated user id: ${userId}
          by: ${
            req.token.role.role === "admin"
              ? "admin"
              : ` the owner id: ${req.token.userId}`
          }`);
          res.status(200).json({
            success: true,
            message: "user updated",
            user: updatedUser,
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Server Error",
            err,
          });
        }
      } else {
        console.log("You are not the user account owner");
        res.status(500).json({
          success: false,
          message: "You are not the user account owner",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: " .findById(userId) Server Error",
        err,
      });
    });
};

//? deleteUserById  /////////////////////////////////

const deleteUserById = (req, res) => {
  /* 
    postman params /:id ==>
    DELETE http://localhost:5000/users/65975437a31cc98f9b7c61e2
  */

  const userId = req.params.id;

  //* check the user account ownership before delete it.
  usersModel
    .findById(userId)
    .then(async (result) => {
      if (result === null) {
        console.log(`user not found id: ${userId}`);
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }

      if (
        result.id.toString() === req.token.userId ||
        req.token.role.role === "admin"
      ) {
        try {
          const findUser = await usersModel.findByIdAndDelete(userId);

          console.log(`user id: ${userId}
          Deleted by: ${
            req.token.role.role === "admin"
              ? "admin"
              : ` the owner id: ${req.token.userId}`
          }`);
          res.status(200).json({
            success: true,
            message: "user deleted",
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Server Error",
            err,
          });
        }
      } else {
        console.log("You are not the user account owner");
        res.status(500).json({
          success: false,
          message: "You are not the user account owner",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: " .findById(userId) Server Error",
        err,
      });
    });
};

//? This function creates a new user ////////////////
const registerUser = (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    phoneNumber,
    age,
    country,
    email,
    userCart,
    userFav,
    password,
    role,
  } = req.body;

  const user = new usersModel({
    userName,
    firstName,
    lastName,
    phoneNumber,
    age,
    country,
    email,
    userCart,
    userFav,
    password,
    role,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `User Created Successfully`,
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
const loginUser = (req, res) => {
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
          userName: result.userName,
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
          role: result.role, //! testing
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
  updateUserById,
  deleteUserById,
  registerUser,
  loginUser,
};
