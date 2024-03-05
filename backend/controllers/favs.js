const usersModel = require("../models/users");
//! I managed userFav in userModel not in the new favsModel

//? getAllFavProducts ////////////////
const getAllFavProducts = (req, res) => {
  /* 
    postman params / ==>
    GET https://k-shop-full-stack-e-commerce-website.onrender.com/favs/
  */

  const userId = req.token.userId;
  usersModel
    .findById(userId)
    .populate("userFav.product")
    .then((result) => {
      res.status(200).json({
        success: true,
        userFav: result.userFav,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("usersModel.findById(userId) Server Error");
    });
};

//? deleteAllFavProducts ////////////////
const deleteAllFavProducts = (req, res) => {
  /* 
    postman params / ==>
    DELETE https://k-shop-full-stack-e-commerce-website.onrender.com/favs/
  */

  const userId = req.token.userId;
  usersModel
    .findByIdAndUpdate(userId, { userFav: [] })
    .then((result) => {
      console.log("userFav has been emptied");
      res.status(200).json({
        success: true,
        msg: "userFav has been emptied",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("usersModel.findByIdAndUpdate Server Error");
    });
};

//? addProductToFav ////////////////
const addProductToFav = async (req, res) => {
  /* 
    postman params /:id ==>
    POST https://k-shop-full-stack-e-commerce-website.onrender.com/favs/:id
  */

  const userId = req.token.userId;
  const addedProductId = req.params.id;

  console.log("addedProductId", addedProductId);
  console.log("req.token", req.token);

  try {
    //* find the user by userId to extract old userFav and add the new product to it.
    const findUser = await usersModel.findById(userId);

    const productAlreadyInFav = findUser.userFav.some(
      (product) => product.product.toString() === addedProductId
    );

    if (productAlreadyInFav) {
      //! add +1 to the product quantity

      usersModel
        .findById(userId)
        .then((result) => {
          let productQuantity = 0;

          const updatedUserFav = result.userFav.filter((product) => {
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
              userFav: updatedUserFav,
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
      //* append the product to the related userFav from usersModel.
      usersModel
        .findByIdAndUpdate(userId, {
          userFav: [
            ...findUser.userFav,
            { product: addedProductId, quantity: 1 },
          ],
        })
        .then((updatedUserResult) => {
          //* return the result of the addProductToFav POST request
          console.log(
            `User #${req.token.userName} added the product #${addedProductId} to userFav`
          );
          res.status(200).json({
            success: true,
            message: `User #${req.token.userName} added the product #${addedProductId} to userFav`,
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

//? getFavProductById ////////////////
const getFavProductById = (req, res) => {
  /* 
    postman params / ==>
    GET https://k-shop-full-stack-e-commerce-website.onrender.com/favs/:id
  */

  const userId = req.token.userId;
  const productId = req.params.id;

  usersModel
    .findById(userId)
    .then((result) => {
      const searchedProduct = result.userFav.filter((product) => {
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

//? updateQuantity ////////////////
const updateQuantity = (req, res) => {
  /* 
    postman params /:id ==>
    PUT https://k-shop-full-stack-e-commerce-website.onrender.com/favs/65a6f73aa6742ee15e4613b9

    req.body:
{
    "quantity": 5
}
  */

  const { quantity } = req.body;
  const userId = req.token.userId;
  const productId = req.params.id;

  //* A-1. find the user that own the fav
  usersModel
    .findById(userId)
    .then(async (result) => {
      try {
        //* A-2. update the favItems list
        const updatedFavItems = await result.userFav.map((favItem) => {
          if (favItem.product.toString() === productId) {
            favItem.quantity = quantity;
            return favItem;
          }
          return favItem;
        });

        console.log("updatedFavItems", updatedFavItems);
        //* A-3. update the fav in the usersModel database
        usersModel
          .findByIdAndUpdate(userId, { userFav: updatedFavItems })
          .then((finalResult) => {
            console.log(`The userFav was updated`);
          })
          .catch((err) => {
            console.log(err);
            console.log("usersModel.findByIdAndUpdate() Server error");
          });

        // console.log("updatedFavItems", updatedFavItems);
        res.status(200).json({
          success: true,
          product: updatedFavItems,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: ".then(async  Server Error",
          err,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("usersModel.findById(userId) Server Error");
    });
};

//? deleteProductFromFav ////////////////
const deleteProductFromFav = (req, res) => {
  /* 
    postman params /:id ==>
    DELETE https://k-shop-full-stack-e-commerce-website.onrender.com/favs/:id
  */

  const userId = req.token.userId;
  const productId = req.params.id;

  usersModel
    .findById(userId)
    .then((result) => {
      const updatedUserFav = result.userFav.filter((product) => {
        return product.product.toString() !== productId;
      });

      //* check if the product already deleted
      const productFound = result.userFav.some((product) => {
        return product.product.toString() === productId;
      });

      if (!productFound) {
        console.log("product not found in userFav or already deleted");
        res.status(400).json("product not found in userFav or already deleted");
      } else {
        usersModel
          .findByIdAndUpdate(userId, { userFav: updatedUserFav })
          .then((finalResult) => {
            console.log(`Product #${productId} has been removed from userFav`);
            res.status(200).json({
              success: true,
              msg: `Product #${productId} has been removed from userFav`,
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
  getAllFavProducts,
  deleteAllFavProducts,
  addProductToFav,
  getFavProductById,
  updateQuantity,
  deleteProductFromFav,
  // moveProductToFav,
};
