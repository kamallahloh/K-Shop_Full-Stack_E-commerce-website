const storesModel = require("../models/stores");
const productsModel = require("../models/products");
const usersModel = require("../models/users");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//? This function will getAllStores
const getAllStores = (req, res) => {
  storesModel
    .find({})
    .populate("role", "-_id -permissions -__v")
    .then((results) => {
      console.log(`getAllStores done`);
      res.status(200).json({
        success: true,
        message: `getAllStores done`,
        stores: results,
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

//? getStoreById  /////////////////////////////////

const getStoreById = async (req, res) => {
  /* 
    postman params /:id ==>
    GET http://localhost:5000/stores/6597610652ee4902379efec3
  */
  const { id } = req.params;

  try {
    const findStore = await storesModel.findOne({ _id: id });
    console.log("findStore==>", findStore);
    if (findStore === null) {
      console.log(`No store found at id: ${id}`);
      res.status(404).json({
        success: false,
        message: `No store found at id: ${id}`,
      });
    } else {
      console.log({
        id: `The store id: ${id}`,
        store: findStore.storeName,
      });
      res.status(200).json({
        success: true,
        message: findStore,
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

//? updateStoreById  /////////////////////////////////

const updateStoreById = (req, res) => {
  /* 
    postman params /:id ==>
    PUT http://localhost:5000/stores/6597610652ee4902379efec3

    req.body:
{
    "storeName": "ss edited",
    "country": "Jordan"
}
  */

  const storeId = req.params.id;

  const {
    storeName,
    country,
    email,
    phoneNumber,
    // password,
  } = req.body;

  //* check the store ownership before update.
  storesModel
    .findById(storeId)
    .then(async (result) => {
      console.log("result.id.toString()", result.id.toString());

      if (
        result.id.toString() === req.token.storeId ||
        req.token.role.role === "admin"
      ) {
        try {
          const findStore = await storesModel.findByIdAndUpdate(storeId, {
            storeName,
            country,
            email,
            phoneNumber,
            // password,
          });

          let updatedStore = {
            storeName: storeName ? storeName : findStore.storeName,
            country: country ? country : findStore.country,
            email: email ? email : findStore.email,
            phoneNumber: phoneNumber ? phoneNumber : findStore.phoneNumber,
            // password: password ? password : findStore.password,
          };

          console.log(`Updated store id: ${storeId}
          by: ${
            req.token.role.role === "admin"
              ? "admin"
              : ` the owner id: ${req.token.storeName}`
          }`);
          res.status(200).json({
            success: true,
            message: "store updated",
            // store: updatedStore,
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: " storesModel.findByIdAndUpdate(storeId) Server Error",
            err,
          });
        }
      } else {
        console.log("You are not the store owner");
        res.status(500).json({
          success: false,
          message: "You are not the store owner",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: " .findById(storeId) Server Error",
        err,
      });
    });
};

//? deleteStoreById  /////////////////////////////////

const deleteStoreById = (req, res) => {
  /* 
    postman params /:id ==>
    DELETE http://localhost:5000/stores/6597610652ee4902379efec3
  */

  const storeId = req.params.id;

  //* check the store ownership before update.
  storesModel
    .findById(storeId)
    .then(async (result) => {
      if (result === null) {
        console.log(`store not found id: ${storeId}`);
        return res.status(404).json({
          success: false,
          message: "store not found",
        });
      }

      if (
        result.id.toString() === req.token.storeId ||
        req.token.role.role === "admin"
      ) {
        try {
          //! ////////////
          //! we need to delete the store product/s from 2 places:
          //* A. From the productsModel

          await productsModel
            .deleteMany({ store: { $eq: req.token.storeId } })
            .then((finalResult) => {
              console.log("The Store Product/s deleted from productsModel");
            })
            .catch((err) => {
              console.log(err);
              console.log(
                "productsModel.updateMany({}, updatedProductsList) Server error"
              );
            });
          //! ////////////
          //* B. From the usersModel => all userCarts
          //* B. to delete the product/s from all userCarts(follow the 4 steps mentioned down).

          //* B-1. find all users that have the store product/s in there userCart
          usersModel
            .find({})
            .then((users) => {
              //* B-2 iterate over all store products to filter them out one by one from the user.userCart
              storesModel
                .findById(storeId)
                .then((store) => {
                  // console.log("store==>>>>>", store);
                  store.products.forEach((product) => {
                    const productId = product.toString();

                    //* B-3. update all userCarts by filtering out each product.
                    users.filter((user) => {
                      // console.log("OLD user.userCart", user.userCart);
                      if (user.userCart.length > 0) {
                        const newUserCart = user.userCart.filter(
                          (productsInCart) => {
                            return (
                              productsInCart.product.toString() !== productId
                            );
                          }
                        );

                        user.userCart = newUserCart;
                        // console.log("NEW user.userCart", user.userCart);

                        //* B-4. update the user in the database
                        usersModel
                          .findByIdAndUpdate(user._id, user)
                          .then((finalResult) => {
                            console.log(
                              `The Product #${productId} was deleted from user #${user.userName} userCart`
                            );
                          })
                          .catch((err) => {
                            console.log(err);
                            console.log(
                              "usersModel.findByIdAndUpdate(user._id, user) Server error"
                            );
                          });
                      }
                    });
                  });
                })
                .catch((err) => {
                  console.log(err);
                  console.log("storesModel.findById(storeId) Server error");
                });
            })
            .catch((err) => {
              console.log(err);
              console.log("usersModel.find({}) Server error");
            });
          //* ////////////////////

          //! ////////////

          //* finally delete the store from storesModel
          console.log(
            `the Store #${storeId} will be permanently deleted after 10s`
          );
          setTimeout(() => {
            storesModel
              .findByIdAndDelete(storeId)
              .then((finalResult) => {
                console.log(`store id: ${storeId}
  Deleted by: ${
    req.token.role.role === "admin"
      ? "admin"
      : ` the owner: ${req.token.storeName}`
  }`);
                res.status(200).json({
                  success: true,
                  message: "store deleted",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  success: false,
                  message:
                    "storesModel.findByIdAndDelete(storeId) Server Error",
                  err,
                });
              });
          }, 10000);
        } catch (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Server Error",
            err,
          });
        }
      } else {
        console.log("You are not the store owner");
        res.status(500).json({
          success: false,
          message: "You are not the store owner",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: " .findById(storeId) Server Error",
        err,
      });
    });
};

//? This function creates a new store ////////////////
const registerStore = (req, res) => {
  const { storeName, country, email, phoneNumber, password, products, role } =
    req.body;

  const store = new storesModel({
    storeName,
    country,
    email,
    phoneNumber,
    password,
    products,
    role,
  });

  store
    .save()
    .then((result) => {
      console.log(`Store Created Successfully`);
      res.status(201).json({
        success: true,
        message: `Store Created Successfully`,
        store: result,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.keyPattern) {
        console.log(`Error status:409 "Conflict" The email already exists`);
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      console.log("Server Error");
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//? loginStore /////////////
const loginStore = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  storesModel
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
          storeId: result._id,
          storeName: result.storeName,
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
          // storeId: result._id,
          // storeName: result.storeName,
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
  getAllStores,
  getStoreById,
  updateStoreById,
  deleteStoreById,
  registerStore,
  loginStore,
};
