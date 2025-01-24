const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  subcategoryName: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  image: { type: String, required: true }, // New image field
  status:{type:Boolean}
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
