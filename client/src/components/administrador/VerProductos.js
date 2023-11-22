import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './VerProductos.css';

const VerProductos = () => {
  const [productos, setProductos] = useState([]);

  const onSubmitBorrar = async (codigo) => {
    try {
      const delRes = await fetch(`http://localhost:5000/productos/${codigo}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (delRes.ok) {
        toast.success('Producto borrado del catálogo');
        getAllProductos();
      } else {
        toast.error('Error al borrar el producto');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmitModificar = async (codigo, e) => {
    try {
      const productoModificado = {
        nombre: e.target.nombre.value,
        descripcion: e.target.descripcion.value,
        precio: e.target.precio.value,
        imageUrl: e.target.imageUrl.value,
        categoria: e.target.categoria.value,
        stock: e.target.stock.value,
      };
      const ModRes = await fetch(`http://localhost:5000/productos/${codigo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoModificado),
      });
      console.log('ModRes:', await ModRes.json());

      if (ModRes.ok) {
        toast.success('Producto editado');
        getAllProductos();
      } else {
        toast.error('Error al editar el producto');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllProductos = async () => {
    try {
      const response = await fetch('http://localhost:5000/productos', {
        method: 'GET',
      });

      if (response.ok) {
        const resProductos = await response.json();
        setProductos(resProductos);
      } else {
        console.error('Error al obtener los productos');
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    getAllProductos();
  }, []);

  return (
    <div className="ver-productos-container">
      <h1>Catálogo de Productos</h1>
      <div className="productos-container">
        {productos.map((producto) => (
          <div className="card" key={producto.codigo}>
            <img className="card-img-top" src={producto.imageUrl} alt={producto.nombre} />
            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); onSubmitModificar(producto.codigo, e); }}>
                <input type="text" className="form-control" id="nombre" defaultValue={producto.nombre} />
                <input type="text" className="form-control" id="descripcion" defaultValue={producto.descripcion} />
                <input type="number" className="form-control" id="precio" defaultValue={producto.precio} />
                <input type="text" className="form-control" id="imageUrl" defaultValue={producto.imageUrl} />
                <input type="text" className="form-control" id="categoria" defaultValue={producto.categoria} />
                <input type="number" className="form-control" id="stock" defaultValue={producto.stock} />
                <button type="submit" className="btn-modificar">Modificar</button>
              </form>
              <form onSubmit={(e) => { e.preventDefault(); onSubmitBorrar(producto.codigo); }}>
                <button type="submit" className="btn-borrar">Borrar</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerProductos;
