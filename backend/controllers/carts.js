const productsModel = require("../models/products");
const cartsModel = require("../models/carts");
const usersModel = require("../models/users");
//!

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//? getAllCartProducts ////////////////
const getAllCartProducts = (req, res) => {
  /* 
    postman params / ==>
    GET http://localhost:5000/carts/
  */

  const userId = req.token.userId;
  usersModel
    .findById(userId)
    .then((result) => {
      console.log(result.userCart);
      res.status(200).json({
        success: true,
        userCart: result.userCart,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("usersModel.findById(userId) Server Error");
    });
};

//? deleteAllCartProducts ////////////////
const deleteAllCartProducts = (req, res) => {
  /* 
    postman params / ==>
    DELETE http://localhost:5000/carts/
  */

  const userId = req.token.userId;
  usersModel
    .findByIdAndUpdate(userId, { userCart: [] })
    .then((result) => {
      console.log("userCart has been emptied");
      res.status(200).json({
        success: true,
        msg: "userCart has been emptied",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("usersModel.findByIdAndUpdate Server Error");
    });
};

//? addProductToCart ////////////////
const addProductToCart = async (req, res) => {
  /* 
    postman params /:id ==>
    POST http://localhost:5000/carts/:id
  */

  const userId = req.token.userId;
  const addedProductId = req.params.id;

  try {
    //* find the user by userId to extract old userCart and add the new product to it.
    const findUser = await usersModel.findById(userId);

    const productAlreadyInCart = findUser.userCart.some(
      (product) => product.product.toString() === addedProductId
    );

    if (productAlreadyInCart) {
      //! add +1 to the product quantity

      usersModel
        .findById(userId)
        .then((result) => {
          let productQuantity = 0;

          const updatedUserCart = result.userCart.filter((product) => {
            if (product.product.toString() === addedProductId) {
              productQuantity = ++product.quantity;
              return {
                product: product.product.toString(),
                quantity: productQuantity,
              };
            }
            return product;
          });

          usersModel
            .findByIdAndUpdate(userId, {
              userCart: updatedUserCart,
            })
            .then((finalResult) => {
              //* return the result of updating the quantity
              console.log(
                `product #${addedProductId} quantity increased to ${productQuantity}`
              );
              res.status(200).json({
                success: true,
                message: `product #${addedProductId} quantity increased by 1 total ${productQuantity}`,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json("usersModel.findByIdAndUpdate Server Error");
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json("usersModel.findById Server Error");
        });
    } else {
      //* append the product to the related userCart from usersModel.
      usersModel
        .findByIdAndUpdate(userId, {
          userCart: [
            ...findUser.userCart,
            { product: addedProductId, quantity: 1 },
          ],
        })
        .then((updatedUserResult) => {
          //* return the result of the addProductToCart POST request
          console.log(
            `User #${userId} added the product #${addedProductId} to userCart`
          );
          res.status(200).json({
            success: true,
            message: `User #${userId} added the product #${addedProductId} to userCart`,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json("usersModel.findByIdAndUpdate Server Error");
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "usersModel.findById Server Error",
      err,
    });
  }
};

//? getCartProductById ////////////////
const getCartProductById = (req, res) => {
  /* 
    postman params / ==>
    GET http://localhost:5000/carts/:id
  */

  const userId = req.token.userId;
  const productId = req.params.id;

  usersModel
    .findById(userId)
    .then((result) => {
      const searchedProduct = result.userCart.filter((product) => {
        return product.product.toString() === productId;
      });

      console.log(searchedProduct);
      res.status(200).json({
        success: true,
        product: searchedProduct,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("usersModel.findById(userId) Server Error");
    });
};

//? deleteProductFromCart ////////////////
const deleteProductFromCart = (req, res) => {
  /* 
    postman params /:id ==>
    DELETE http://localhost:5000/carts/:id
  */

  const userId = req.token.userId;
  const productId = req.params.id;

  usersModel
    .findById(userId)
    .then((result) => {
      const updatedUserCart = result.userCart.filter((product) => {
        return product.product.toString() !== productId;
      });

      //* check if the product already deleted
      const productFound = result.userCart.some((product) => {
        return product.product.toString() === productId;
      });

      if (!productFound) {
        console.log("product not found in userCart or already deleted");
        res
          .status(400)
          .json("product not found in userCart or already deleted");
      } else {
        usersModel
          .findByIdAndUpdate(userId, { userCart: updatedUserCart })
          .then((finalResult) => {
            console.log(`Product #${productId} has been removed from userCart`);
            res.status(200).json({
              success: true,
              msg: `Product #${productId} has been removed from userCart`,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json("usersModel.findByIdAndUpdate Server Error");
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("usersModel.findById Server Error");
    });
};

module.exports = {
  getAllCartProducts,
  deleteAllCartProducts,
  addProductToCart,
  getCartProductById,
  deleteProductFromCart,
  // moveProductToFav,
};
