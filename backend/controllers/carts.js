const productsModel = require("../models/products");
const cartsModel = require("../models/carts");
const usersModel = require("../models/users");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//? addProductToCart ////////////////
const addProductToCart = async (req, res) => {
  /* 
    postman params / ==>
    POST http://localhost:5000/carts/:id
  */

  const userId = req.token.userId;
  const addedProductId = req.params.id;

  // console.log("userId=>>>>", userId);
  // console.log("addedProductId=>>>>", addedProductId);
  try {
    //* find the user by userId to extract old userCart and add the new product to it.
    const findUser = await usersModel.findById(userId);

    // console.log("findUser=>>>", findUser);

    const productAlreadyInCart = findUser.userCart.some(
      (product) => product.product.toString() === addedProductId
    );

    let productQuantity = 0;

    findUser.userCart.map((product) => {
      if (product.product.toString() === addedProductId) product.quantity++;
      productQuantity = product.quantity;
    });

    if (productAlreadyInCart) {
      console.log("productAlreadyInCart", productAlreadyInCart);

      //! add +1 to the product quantity

      usersModel
        .findByIdAndUpdate(userId, {
          userCart: [
            ...findUser.userCart,
            { product: addedProductId, quantity: productQuantity },
          ],
        })
        .then((updatedUserResult) => {
          //* return the result of the addProductToCart POST request
          console.log(
            `product #${addedProductId} quantity increased by 1 total ${productQuantity}`
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
    } else {
      //* append the product to the related user from usersModel.
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

module.exports = {
  // getAllCartProducts,
  // deleteAllCartProducts,
  addProductToCart,
  // getCartProductById,
  // deleteProductFromCart,
  // moveProductToFav,
};
