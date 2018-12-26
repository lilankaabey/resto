const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  itemName: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  itemDescription: { type: String, required: true }
});

module.exports = mongoose.model('Item', postSchema);
