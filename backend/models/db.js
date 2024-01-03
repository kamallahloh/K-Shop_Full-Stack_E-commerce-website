const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI).then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err);
  }
);

