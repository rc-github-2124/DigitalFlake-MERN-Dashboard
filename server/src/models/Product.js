const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  image: { type: String },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", productSchema);
