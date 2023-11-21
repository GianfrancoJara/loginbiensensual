
// AgregarProducto.js
import React, { useState } from 'react';
import './AgregarProducto.css'; // Importa el archivo de estilos

const AgregarProducto = () => {
  const [newProductoData, setNewProductoData] = useState({
    codigo: '',
    nombre: '',
    precio: '',
    imageUrl: '',
    categoria: '',
    stock: '',
    cantidad: 1,
    descripcion: '',
    tallaRopa: '',
    tallaCalzado: ''
  });

  const createProducto = async () => {
    try {
      const response = await fetch('http://localhost:5000/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductoData),
      });

      if (response.status === 200) {
        // El producto se creó con éxito
        // Puedes realizar alguna acción, como limpiar el formulario o actualizar la lista de productos
        setNewProductoData({
          codigo: '',
          nombre: '',
          precio: '',
          imageUrl: '',
          categoria: '',
          stock: '',
          cantidad: 1,
          descripcion: '',
          tallaRopa: '',
          tallaCalzado: ''
        });
      } else {
        // Ocurrió un error al crear el producto
        // Maneja el error, muestra un mensaje de error, etc.
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <div className="agregar-producto-container">
      <h1>Catálogo de Productos</h1>
      {/* Tu formulario para agregar productos */}
      <input
                      type="text"
                      placeholder="Código del producto"
                      value={newProductoData.codigo}
                      onChange={(e) => setNewProductoData({ ...newProductoData, codigo: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Nombre del producto"
                      value={newProductoData.nombre}
                      onChange={(e) => setNewProductoData({ ...newProductoData, nombre: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Descripción"
                      value={newProductoData.descripcion}
                      onChange={(e) => setNewProductoData({ ...newProductoData, descripcion: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Precio"
                      value={newProductoData.precio}
                      onChange={(e) => setNewProductoData({ ...newProductoData, precio: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="URL de la imagen"
                      value={newProductoData.imageUrl}
                      onChange={(e) => setNewProductoData({ ...newProductoData, imageUrl: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Categoría"
                      value={newProductoData.categoria}
                      onChange={(e) => setNewProductoData({ ...newProductoData, categoria: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={newProductoData.stock}
                      onChange={(e) => setNewProductoData({ ...newProductoData, stock: e.target.value })}
                    />
      <button onClick={createProducto}>Agregar Producto</button>
    </div>
  );
};

export default AgregarProducto;
