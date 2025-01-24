const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { productName, image, subcategory, category } = req.body;
    if (!productName || !subcategory || !category) {
      return res.status(400).json({ error: "productName, subcategory, and category are required" });
    }
    const product = new Product({ productName, subcategory, category, });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("subcategory", "subcategoryName")
      .populate("category", "categoryName image");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("subcategory", "subcategoryName")
      .populate("category", "categoryName image");

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, subcategory, category } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Update fields if new values are provided
    product.productName = productName || product.productName;
    product.subcategory = subcategory || product.subcategory;
    product.category = category || product.category;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
