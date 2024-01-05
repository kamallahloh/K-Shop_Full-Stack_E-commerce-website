const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const storeSchema = new mongoose.Schema({
  storeName: { type: String, required: true, unique: true },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

storeSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.storeName = this.storeName.toLowerCase();
  this.password = await bcrypt.hash(this.password, 8);
});
module.exports = mongoose.model("Store", storeSchema);
