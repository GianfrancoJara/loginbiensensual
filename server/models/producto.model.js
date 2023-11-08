const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    trim: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  precio: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
  },
  cantidad: {
    type: Number,
  },
  descripcion: {
    type: String,
    trim: true,
    minlength: 3,
  },
  tallaRopa: {
    type: String,
    trim: true,
  },
  tallaCalzado: {
    type: String,
    trim: true,
  },
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
