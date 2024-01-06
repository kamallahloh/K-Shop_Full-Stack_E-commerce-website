const storesModel = require("../models/stores");
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

const updateStoreById = async (req, res) => {
  /* 
    postman params /:id ==>
    PUT http://localhost:5000/stores/6597610652ee4902379efec3

    req.body:
{
    "storeName": "ss edited",
    "country": "Jordan"
}
  */

  const { id } = req.params;
  const {
    storeName,
    country,
    email,
    // password,
    // products,
    // role,
  } = req.body;
  try {
    const findStore = await storesModel.findByIdAndUpdate(id, {
      storeName,
      country,
      email,
      // password,
      // products,
      // role,
    });

    let updatedStore = {
      storeName: storeName ? storeName : findStore.storeName,
      country: country ? country : findStore.country,
      email: email ? email : findStore.email,
      // password: password ? password : findStore.password,
      // products: products ? products : findStore.products,
      // role: role ? role : findStore.role,
    };

    console.log(`Updated store id: ${id}`);

    res.status(200).json({
      success: true,
      message: "store updated",
      store: updatedStore,
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

//? deleteStoreById  /////////////////////////////////

const deleteStoreById = async (req, res) => {
  /* 
    postman params /:id ==>
    DELETE http://localhost:5000/stores/6597610652ee4902379efec3
  */

  const { id } = req.params;
  try {
    const findStore = await storesModel.findByIdAndDelete(id);
    if (findStore === null) {
      console.log({ id: `store not found id: ${id}` });
      return res.status(404).json({
        success: false,
        message: "store not found",
      });
    }
    console.log({
      id: `store deleted id: ${id}`,
    });

    res.status(200).json({
      success: true,
      message: "store deleted",
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
      res.status(201).json({
        success: true,
        message: `Store Created Successfully`,
        store: result,
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
          store: result.storeName,
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
