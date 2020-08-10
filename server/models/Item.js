const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  partNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  orderLimit: {
    type: Number,
    required: false,
  },
  lessThanLimit: {
    type: Boolean,
    required: false,
    default: false,
  },
  category: {
    type: String,
    required: false,
  },
  instrument: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
