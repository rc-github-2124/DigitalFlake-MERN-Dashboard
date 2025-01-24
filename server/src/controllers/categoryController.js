const Category = require("../models/Category");
const path = require("path");

// Controller to handle category creation
exports.createCategory = async (req, res) => {
  try {
    const { categoryName, status } = req.body; 
    const image = req.file ? req.file.path : null;  

    // Validate input data
    if (!categoryName || !image) {
      return res.status(400).json({ message: "Category name and image are required." });
    }

    // Convert status to boolean
    const statusBool = status === "Active";  

    const category = new Category({
      categoryName,
      image,
      status: statusBool,  
    });

    await category.save();
    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle fetching all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle category update
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, status } = req.body;  // Include status if it's being updated
    const image = req.file ? req.file.path : null;  // New image path if a file is uploaded

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Update category fields
    category.categoryName = categoryName || category.categoryName;  // If categoryName is provided, update it
    category.status = status || category.status;  // If status is provided, update it (it should be a boolean)
    category.image = image || category.image;  // Update the image if a new one is uploaded, otherwise retain the old one

    await category.save();
    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle fetching a category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle deleting a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
