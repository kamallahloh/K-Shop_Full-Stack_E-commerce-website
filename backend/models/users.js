const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: Number },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  userCart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  userFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.userName = this.userName.toLowerCase();
  this.password = await bcrypt.hash(this.password, 8);
});
module.exports = mongoose.model("User", userSchema);
