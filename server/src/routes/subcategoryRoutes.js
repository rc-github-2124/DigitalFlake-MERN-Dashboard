const express = require("express");
const multer = require("multer");
const path = require("path");
const subcategoryController = require("../controllers/subcategoryController");
const router = express.Router();

// Ensure the uploads folder exists
const fs = require('fs');
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filename
  },
});

// Initialize multer with storage configuration and file size limit
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Middleware to handle file upload errors
const uploadErrorHandling = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Multer error: ${err.message}` });
  }
  if (err) {
    return res.status(500).json({ message: "Server error while uploading the file." });
  }
  next();
};

// Routes
router.post("/", upload.single("image"), uploadErrorHandling, subcategoryController.createSubcategory);
router.get("/", subcategoryController.getSubcategories);
router.put("/:id", upload.single("image"), uploadErrorHandling, subcategoryController.updateSubcategory);
router.get("/:id", subcategoryController.getSubcategoryById);
router.delete("/:id", subcategoryController.deleteSubcategory);

module.exports = router;
