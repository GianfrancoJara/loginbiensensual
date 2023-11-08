import {ProductosLista} from "./Productos.js";
import "./Productos.css";
import React, { useState, useEffect } from 'react';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

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
        <ProductosLista />
    </div>

      
  );
};


export default Catalogo;