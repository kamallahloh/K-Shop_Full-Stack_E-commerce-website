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
  console.log("req.token", req.token);
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
    // .populate("store", "-_id -country -email -password -products -role -__v")
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
    GET http://localhost:5000/products/search_2/659772f33246f4dc798c9af5
  */
  const { id } = req.params;

  try {
    const findProduct = await productsModel
      .findOne({ _id: id })
      .populate("store", "-_id -country -email -password -products -role -__v");

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

const updateProductById = async (req, res) => {
  /* 
    postman params /:id ==>
    PUT http://localhost:5000/products/659772f33246f4dc798c9af5

    req.body:
{
    "productName": "pp edited",
    "price": 999
}
  */

  const { id } = req.params;
  const {
    productName,
    description,
    price,
    // store,
  } = req.body;
  try {
    const findProduct = await productsModel.findByIdAndUpdate(id, {
      productName,
      description,
      price,
      // store,
    });

    let updatedProduct = {
      productName: productName ? productName : findProduct.productName,
      description: description ? description : findProduct.description,
      price: price ? price : findProduct.price,
      // store: store ? store : findProduct.store,
    };

    console.log(`Updated product id: ${id}`);

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
};

//? deleteProductById  /////////////////////////////////

const deleteProductById = async (req, res) => {
  /* 
    postman params /:id ==>
    DELETE http://localhost:5000/products/659772f33246f4dc798c9af5
  */

  const { id } = req.params;
  try {
    const findProduct = await productsModel.findByIdAndDelete(id);
    if (findProduct === null) {
      console.log({ id: `product not found id: ${id}` });
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    console.log({
      id: `product deleted id: ${id}`,
    });

    res.status(200).json({
      success: true,
      message: "product deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      err,
    });
  }
};

//? 5. getProductsByStore ///////////////////////////

const getProductsByStore = async (req, res) => {
  //* postman GET http://localhost:5000/products/search?store=6597612052ee4902379efec7

  console.log("req.query", req.query);

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
