const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true},
  description: { type: String },
  images: [{ type: String }],
  categories: [{ type: String }],
  price: { type: Number , required: true},
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
});

module.exports = mongoose.model("Product", productSchema);

