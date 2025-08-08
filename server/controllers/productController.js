const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      stock,
      price,
      size,
      category,
      subcategory,
      section
    } = req.body;

    const imagePaths = req.files.map(file => file.path);

    const product = new Product({
      name,
      description,
      stock,
      price,
      size: Array.isArray(size) ? size : [size],
      category,
      subcategory,
      section,
      images: imagePaths,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

module.exports = { addProduct };
