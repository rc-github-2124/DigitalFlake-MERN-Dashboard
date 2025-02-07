const Subcategory = require("../models/Subcategory");
const path = require("path");

// Controller to handle subcategory creation
exports.createSubcategory = async (req, res) => {
  try {
    const { subcategoryName, category, status } = req.body; 
    const image = req.file ? req.file.path : null;  // Handle image upload

    // Validate input data
    if (!subcategoryName || !category || !image) {
      return res.status(400).json({ message: "Subcategory name, category, and image are required." });
    }

    // Convert status to boolean if it's provided
    const statusBool = status === "Active";  

    // Create subcategory document
    const subcategory = new Subcategory({
      subcategoryName,
      category,
      status: statusBool,  
      image,  // Save the image path
    });

    await subcategory.save();
    res.status(201).json({ message: "Subcategory created successfully", subcategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle fetching all subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category", "categoryName image");
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle subcategory update
exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { subcategoryName, category, status } = req.body;  
    const image = req.file ? req.file.path : null;  // Handle updated image path if any

    const subcategory = await Subcategory.findById(id);

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found." });
    }

    // Update fields if new values are provided
    subcategory.subcategoryName = subcategoryName || subcategory.subcategoryName;
    subcategory.category = category || subcategory.category;
    subcategory.status = status !== undefined ? status : subcategory.status;
    subcategory.image = image || subcategory.image;  // Update image only if new one is uploaded

    await subcategory.save();
    res.status(200).json({ message: "Subcategory updated successfully", subcategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle fetching a subcategory by ID
exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate("category", "categoryName image");

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found." });
    }

    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle deleting a subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findByIdAndDelete(id);

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found." });
    }

    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
