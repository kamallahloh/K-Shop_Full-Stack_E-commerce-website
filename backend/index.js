const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import Routers
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const storesRouter = require("./routes/stores");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

// Routes Middleware
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/stores", storesRouter);
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
