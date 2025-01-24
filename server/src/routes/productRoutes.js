const express = require("express");
const { createProduct, getProducts,getProductById,updateProduct,deleteProduct} = require("../controllers/productController");
const router = express.Router();
const multer = require('multer')

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

router.post("/",upload.single("image"), uploadErrorHandling, createProduct);
router.get("/", getProducts);
router.put("/:id", upload.single("image"), uploadErrorHandling, updateProduct);

router.get("/:id", getProductById);

router.delete('/:id',deleteProduct)

module.exports = router;
