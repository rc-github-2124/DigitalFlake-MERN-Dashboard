const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("Category", categorySchema);
