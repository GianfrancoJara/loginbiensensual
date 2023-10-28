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
									key={producto.id}
									title={producto.title}
									image={producto.image}
									category={producto.category}
									price={producto.price}
									id={producto.id}
								/>
							))
						}					
        </div>
				</>
    )
}
