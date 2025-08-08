const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const cartController = require("./controllers/cartController");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use("/api/products", productRoutes);
app.get("/api/cart/:userId", cartController.getCart);
app.post("/api/cart/add", cartController.addToCart);
app.put("/api/cart/:userId", cartController.updateQuantity);
app.put("/api/cart/:userId/remove", cartController.removeFromCart);



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
