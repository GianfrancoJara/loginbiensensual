const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  imageUrl: String,
  category: String,
  cantidad: Number,
  description: String,
  
});

const Productos = mongoose.model('Productos', productoSchema);

module.exports = Productos;
