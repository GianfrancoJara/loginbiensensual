import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
export const DataContext = createContext();

export const DataProvider = (props) => {
	const [productos, setProductos] = useState([]);
	const [menu, setMenu] = useState(false);
	const [carrito, setCarrito] =useState([]);
	const [total, setTotal] = useState(0);
	const dataCarrito = JSON.parse(localStorage.getItem('dataCarrito'));
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
  useEffect(() => {
		getAllProductos();
	}, []);

	const addCarrito = (codigo) =>{
		const check = carrito.every(item =>{
			return item.codigo !== codigo
		})
		const data = productos.filter(producto =>{
			return producto.codigo === codigo
		})
		console.log(codigo);
		if(check){
			data[0].cantidad = 1;
			setCarrito([...carrito, ...data]);
			toast.success(data[0].nombre+" añadido al carrito");
		}else{
			data[0].cantidad++;
			toast.success(data[0].nombre+" se ha sumado 1 al carrito");
		}
	}
	useEffect(() =>{
		if(dataCarrito.length > 0 )
		{
			setCarrito(dataCarrito);
		};
	}, []);

	useEffect(() =>{
		localStorage.setItem('dataCarrito', JSON.stringify(carrito))
	},[carrito])

	useEffect(() =>{
		const getTotal = () =>{
			const res = carrito.reduce((prev, item) =>{
				return prev + (item.precio * item.cantidad)
			},0)
			setTotal(res)
		}
		getTotal()
	},[carrito])
	
	const value = {
		productos : [productos],
		menu: [menu, setMenu],
		carrito: [carrito, setCarrito],
		addCarrito: addCarrito,
		total: [total, setTotal]
	}
	return (
		<DataContext.Provider value={value}>
			{props.children}
		</DataContext.Provider>
	)
};