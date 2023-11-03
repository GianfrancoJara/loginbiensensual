const express = require('express');
const router = express.Router();
const Productos = require('../models/productos.model');

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
    try {
      const newProducto = new Productos(req.body); // Crea una instancia del modelo Product
      await newProducto.save(); // Guarda el nuevo producto en la base de datos
      console.log(newProducto)
      res.json(newProducto); // Devuelve el producto creado como respuesta
    } catch (error) {
      res.status(500).json({ error: 'No se pudo crear el producto' });
    }
  });

  // Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
      const productos = await Productos.find(); // Busca todos los productos en la base de datos
      res.json(productos); // Devuelve la lista de productos como respuesta
    } catch (error) {
      res.status(500).json({ error: 'No se pudieron obtener los productos' });
    }
  });

  
  // Ruta para actualizar un producto por su ID
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Obtiene el ID del producto a actualizar
    try {
      const updatedProducto = await Productos.findByIdAndUpdate(id, req.body, { new: true }); // Actualiza el producto
      res.json(updatedProducto); // Devuelve el producto actualizado como respuesta
    } catch (error) {
      res.status(500).json({ error: 'No se pudo actualizar el producto' });
    }
  });

  
  // Ruta para eliminar un producto por su ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Obtiene el ID del producto a eliminar
    try {
      await Productos.findByIdAndDelete(id); // Elimina el producto de la base de datos
      res.json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'No se pudo eliminar el producto' });
    }
  });

  

  
  module.exports = router;