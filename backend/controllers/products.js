const productsModel = require("../models/products");
const storesModel = require("../models/stores");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//? This function creates a new Product ////////////////
const addProduct = (req, res) => {
  /* 
    postman params / ==>
    POST http://localhost:5000/products
  */

  const { productName, description, price } = req.body;
  const store = req.token.storeId;

  const product = new productsModel({ productName, description, price, store });

  product
    .save()
    .then(async (result) => {
      //* find the store by storeId to extract old products and concat the new one with them.
      const findStore = await storesModel.findById(store);

      //* append the new created product to the related store from storesModel.
      storesModel
        .findByIdAndUpdate(store, {
          products: [...findStore.products, product],
        })

        .then((updatedStoreResult) => {
          console.log(
            `Store #${store} appended with new product #${result._id}`
          );
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json("storesModel.findByIdAndUpdate err");
        });

      //* return the result of the addProduct POST request
      res.status(201).json({
        success: true,
        message: `Product Created Successfully`,
        product: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//? This function will getAllProducts
const getAllProducts = (req, res) => {
  productsModel
    .find({})
    .populate(
      "store",
      "-_id -country -email -phoneNumber -password -products -role -__v"
    )
    .then((results) => {
      console.log(`getAllProducts done`);
      res.status(200).json({
        success: true,
        message: `getAllProducts done`,
        products: results,
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

//? getProductById  /////////////////////////////////

const getProductById = async (req, res) => {
  /* 
    postman params /:id ==>
    GET http://localhost:5000/products/product_by_id/6598c40fc2e3213f7ba2a5d4
  */
  const { id } = req.params;

  try {
    const findProduct = await productsModel
      .findOne({ _id: id })
      .populate(
        "store",
        "-_id -country -phoneNumber -email -password -products -role -__v"
      );

    console.log("findProduct==>", findProduct);
    if (findProduct === null) {
      console.log(`No product found at id: ${id}`);
      res.status(404).json({
        success: false,
        message: `No product found at id: ${id}`,
      });
    } else {
      console.log({
        id: `The product id: ${id}`,
        product: findProduct.productName,
      });
      res.status(200).json({
        success: true,
        message: findProduct,
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

//? updateProductById  /////////////////////////////////

const updateProductById = (req, res) => {
  /* 
    postman params /:id ==>
    PUT http://localhost:5000/products/659772f33246f4dc798c9af5

    req.body:
{
    "productName": "pp edited",
    "price": 999
}
  */

  const productId = req.params.id;
  const { productName, description, price } = req.body;

  //* check if the store is the one who post the product that we want to update.
  productsModel
    .findById(productId)
    .then(async (result) => {
      if (
        result.store.toString() === req.token.storeId ||
        req.token.role.role === "admin"
      ) {
        try {
          const findProduct = await productsModel.findByIdAndUpdate(productId, {
            productName,
            description,
            price,
          });

          let updatedProduct = {
            productName: productName ? productName : findProduct.productName,
            description: description ? description : findProduct.description,
            price: price ? price : findProduct.price,
          };

          console.log(`Updated product id: ${productId}
          by: ${
            req.token.role.role === "admin"
              ? "admin"
              : ` the owner id: ${req.token.storeId}`
          }`);

          res.status(200).json({
            success: true,
            message: "product updated",
            product: updatedProduct,
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
        console.log("You are not the product owner");
        res.status(500).json({
          success: false,
          message: "You are not the product owner",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    });
};

//? deleteProductById  /////////////////////////////////

const deleteProductById = (req, res) => {
  /* 
    postman params /:id ==>
    DELETE http://localhost:5000/products/659772f33246f4dc798c9af5
  */
  const productId = req.params.id;

  //* check if the store is the one who post the product that we want to delete.
  productsModel
    .findById(productId)
    .then(async (result) => {
      if (result === null) {
        console.log(`product not found id: ${productId}`);
        return res.status(404).json({
          success: false,
          message: "product not found",
        });
      }

      if (
        result.store.toString() === req.token.storeId ||
        req.token.role.role === "admin"
      ) {
        try {
          //! we need to delete the product from 2 places:
          //* A. From the productsModel
          //* A-1 productsModel.findByIdAndDelete(productId)
          const findProduct = await productsModel.findByIdAndDelete(productId);

          //* ////////////////////
          //* B. from storesModel: to delete the product from the store (follow the 3 steps mentioned down).
          //* B-1. find the store that own the product
          storesModel
            .findById(req.token.storeId)
            .then(async (storeResult) => {
              try {
                //* B-2. update the store products list
                const updatedStoreProducts = await storeResult.products.filter(
                  (product) => {
                    if (product.toString() !== productId) return product;
                  }
                );
                storeResult.products = updatedStoreProducts;

                //* B-3. update the store in the database
                storesModel
                  .findByIdAndUpdate(req.token.storeId, storeResult)
                  .then((finalResult) => {
                    console.log(`The Product was deleted from its Store`);
                  })
                  .catch((err) => {
                    console.log(err);
                    console.log(
                      "storesModel.findByIdAndUpdate(req.token.storeId, storeResult) Server error"
                    );
                  });
              } catch (err) {
                console.log(err);
                console.log("async (storeResult) Server Error");
              }
            })
            .catch((err) => {
              console.log(err);
              console.log(
                "storesModel.findById(req.token.storeId).then Server error"
              );
            });
          //* ////////////////////

          //* A-2 return the response after deleting the product from the productsModel.
          console.log(`product id: ${productId}
          Deleted by: ${
            req.token.role.role === "admin"
              ? "admin"
              : ` the owner id: ${req.token.storeId}`
          }`);
          res.status(200).json({
            success: true,
            message: "product deleted",
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message:
              "productsModel.findById(productId) async (result)  Server Error",
            err,
          });
        }
      } else {
        console.log("You are not the product owner");
        res.status(500).json({
          success: false,
          message: "You are not the product owner",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "productsModel.findById(productId).then Server Error",
        err,
      });
    });
};

//? 5. getProductsByStore ///////////////////////////

const getProductsByStore = async (req, res) => {
  //* postman GET http://localhost:5000/products/products_by_store?store=65999be449aad7d6418c5166

  const { store } = req.query;

  try {
    const findProducts = await productsModel.find({ store });

    console.log("findProducts==>", findProducts);

    if (findProducts.length === 0) {
      console.log(`The store => ${store} has no Products`);
      res.status(404).json({
        success: false,
        message: `The store => ${store} has no Products`,
      });
    } else {
      console.log(`All the Products for the store: ${store}`);
      res.status(200).json({
        success: true,
        message: findProducts,
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

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByStore,
};
