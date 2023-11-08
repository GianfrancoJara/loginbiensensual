import "./Productos.css";
import React, {useContext} from 'react'
import { DataContext } from "./context/Dataprovider";
import { ProductoItem } from "./ProductoItem";


export const ProductosLista = () => {
	const value = useContext(DataContext)
	const [productos] = value.productos;
    return (
			<>
        <div className="productos">
            {
							productos.map(producto =>(
								<ProductoItem 
									key={producto.codigo}
									nombre={producto.nombre}
									image={producto.image}
									categoria={producto.categoria}
									precio={producto.precio}
									stock={producto.stock}
									codigo={producto.codigo}
								/>
							))
						}					
        </div>
				</>
    )
}
