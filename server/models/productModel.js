const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  stock: Number,
  price: Number,
  size: [String],
  category: String,
  subcategory: String,
  section: String,
  images: [String], // file paths or URLs
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
