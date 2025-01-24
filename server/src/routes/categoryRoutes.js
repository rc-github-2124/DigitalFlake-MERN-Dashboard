// routes/categoryRouter.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const { createCategory, getCategories, updateCategory,getCategoryById,deleteCategory } = require("../controllers/categoryController");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filename
  },
});

// Initialize multer with storage configuration
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
}).single("image"); // Handle a single file upload with the field name 'image'

// Route to create a category
router.post("/", upload, createCategory);

// Route to get all categories
router.get("/", getCategories);

// Route to update a category by ID
router.put("/:id", upload, updateCategory);

router.get("/:id", getCategoryById);

router.delete('/:id',deleteCategory)

module.exports = router;
