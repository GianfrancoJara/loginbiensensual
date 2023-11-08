import React, { useState, useEffect } from 'react';
const VerProductos = () => {

    const [productos, setProductos] = useState([]);
    let listaProductos = [];
    const getAllProductos = async () => {
		try {
		  const response = await fetch('http://localhost:5000/productos', {
			method: 'GET',
		  });
	
		  if (response.status === 200) {
			const resProductos = await response.json();
			// Actualiza el estado de productos con la lista de productos obtenida
			setProductos(resProductos);
		  } else {
			// Ocurrió un error al obtener los productos
			// Maneja el error, muestra un mensaje de error, etc.
		  }
		} catch (error) {
		  console.error('Error al obtener los productos:', error);
		}
	  };
    productos.forEach((producto) => {
        listaProductos.push(
            <div className="card" key={producto.codigo}>
            <img className="card-img-top" src={producto.imageUrl} alt={producto.nombre}/>
                <div className="card-body">
                    <h1 className="card-text">{producto.codigo}</h1>
                    <p className="card-text">{producto.nombre}</p>
                    <p className="card-text">{producto.descripcion}</p>
                </div>
            </div>
        )
    });

    useEffect(() => {
		getAllProductos();
	}, []);

        return (
            <div>
                <h1>Catálogo de Productos</h1>
                {listaProductos}
            </div>
        )    
}
export default VerProductos;