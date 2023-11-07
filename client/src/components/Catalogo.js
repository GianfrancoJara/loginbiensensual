import {ProductosLista} from "./Productos.js";
import { Carrito } from "./Carrito"
import "./Productos.css";
import { DataContext } from "./context/Dataprovider";
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";

const Catalogo = () => {
  const [newProductoData, setNewProductoData] = useState({
    title: '',
    price: '',
    imageUrl: '',
    category: '',
    cantidad: '',
    description: '',
  });
  const [productos, setProductos] = useState([]);
  const value = useContext(DataContext);
  const addCarrito = value.addCarrito;

  const createProducto = async () => {
    try {
      console.log(newProductoData)
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
          title: '',
          price: '',
          imageUrl: '',
          category: '',
          cantidad: '',
          description: '',
        });
        getAllProductos();
      } else {
        // Ocurrió un error al crear el producto
        // Maneja el error, muestra un mensaje de error, etc.
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  const getAllProductos = async () => {
    try {
      const response = await fetch('http://localhost:5000/productos', {
        method: 'GET',
      });

      if (response.status === 200) {
        const productos = await response.json();
        // Actualiza el estado de productos con la lista de productos obtenida
        setProductos(productos);
      } else {
        // Ocurrió un error al obtener los productos
        // Maneja el error, muestra un mensaje de error, etc.
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    // Llama a getAllProductos al cargar el componente para mostrar la lista de productos
    getAllProductos();
  }, []);

  return (

      <div className="Catalogo">

    <div>
      <h1>Catálogo de Productos</h1>
      {/* Tu formulario para agregar productos */}
      <input
        type="text"
        placeholder="Título del producto"
        value={newProductoData.title}
        onChange={(e) => setNewProductoData({ ...newProductoData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={newProductoData.description}
        onChange={(e) => setNewProductoData({ ...newProductoData, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={newProductoData.price}
        onChange={(e) => setNewProductoData({ ...newProductoData, price: e.target.value })}
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
        value={newProductoData.category}
        onChange={(e) => setNewProductoData({ ...newProductoData, category: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={newProductoData.cantidad}
        onChange={(e) => setNewProductoData({ ...newProductoData, cantidad: e.target.value })}
      />
      <button onClick={createProducto}>Agregar Producto</button>

      {/* Lista de productos */}
      <div className="productos">
        {productos.map((producto) => (
          <div key={producto._id} className="producto">
          <Link to={`/producto/${producto._id}`}>
          <div className="producto__img">
            <img src={producto.image} alt={producto.title} />
          </div>
          </Link>
          <div className="producto__footer">
            <h1>{producto.title}</h1>
            <p>{producto.category}</p>
            <p className="price">${producto.price} </p>
          </div>
          <div className="bottom">
          <button onClick={() => addCarrito(producto._id)} type="button" class="btn btn-primary"> Añadir al carrito </button>
            <div>
            <Link to={`/producto/${producto._id}`} className="btn"><button type="button" class="btn btn-info">Vista</button></Link>
            </div>
          </div>
        </div>
        ))}
              </div>
    </div>
      <ProductosLista />


      </div>

      
  );
};


export default Catalogo;