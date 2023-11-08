import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";

const VerProductos = () => {

    const [productos, setProductos] = useState([]);
    let listaProductos = [];
    
    const onSubmitBorrar = async(codigo) => {
        try{
            const body = {codigo};
            const delRes = await fetch("http://localhost:5000/productos/"+codigo,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/JSON",
                },
                body: JSON.stringify(body)
            });
            toast.success("Producto borrado del catalogo");
            getAllProductos();
        } catch (err) {
          console.error(err.message);
        }
    };
    const onSubmitModificar = async(codigo, e) => {
        try{
            const productoModificado = {
                codigo: codigo,
                nombre: e.target.nombre.value,
                descripcion: e.target.descripcion.value,
                precio: e.target.precio.value,
                imageUrl: e.target.imageUrl.value,
                categoria: e.target.categoria.value,
                stock: e.target.stock.value
            }
            const body = {productoModificado}
            const ModRes = await fetch("http://localhost:5000/productos/"+codigo,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/JSON",
                },
                body: JSON.stringify(body)
            });
            toast.success("Producto editado");
            getAllProductos();
        } catch (err) {
          console.error(err.message);
        }
    };

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
                <form onSubmit={(e) => {e.preventDefault(); onSubmitModificar(producto.codigo, e)}}>
                    <input type='text' className='form-control' id='codigo' defaultValue={producto.codigo} readOnly></input>
                    <input type='text' className='form-control' id='nombre' defaultValue={producto.nombre}></input>
                    <input type='text' className='form-control' id='descripcion' defaultValue={producto.descripcion}></input>
                    <input type='number' className='form-control' id='precio' defaultValue={producto.precio}></input>
                    <input type='text' className='form-control' id='imageUrl' defaultValue={producto.imageUrl}></input>
                    <input type='text' className='form-control' id='categoria' defaultValue={producto.categoria}></input>
                    <input type='number' className='form-control' id='stock' defaultValue={producto.stock}></input>
                    <button type="submit" className="btn-secondary btn-block btn">Modificar</button>
                </form>
                <form onSubmit={(e) => {e.preventDefault(); onSubmitBorrar(producto.codigo)}}>
                    <button type="submit" className="btn-danger btn-block btn">Borrar</button>
                </form>
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