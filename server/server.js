const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes =require("./routes/authRoutes");
const app = express();
const reviewRoutes = require("./routes/reviewRoutes");
connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));
app.use( "/api/orders",orderRoutes);
app.use("/api/products", productRoutes);
app.use( "/api/auth",authRoutes);
app.use( "/api/reviews",reviewRoutes);
app.get("/", (req, res) => {
  res.send("Nirvify Backend Running");
});

const PORT = process.env.PORT||5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});