import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./context/Dataprovider";
import "./cliente/Productos";

export const ProductoItem = ({codigo, nombre, imageUrl, categoria, precio}) => {
  
  const value = useContext(DataContext);
  const addCarrito = value.addCarrito;

  return (
    
    <div key={codigo} className="producto">
      <Link to={`/producto/${codigo}`}>
      <div className="producto__img">
        <img src={imageUrl} alt={nombre} />
      </div>
      </Link>
      <div className="producto__footer">
        <h1>{nombre}</h1>
        <p>{categoria}</p>
        <p className="precio">${precio} </p>
      </div>
      <div className="bottom">
      <button onClick={() => addCarrito(codigo)} type="button" class="btn btn-primary"> Añadir al carrito </button>
        <div>
        <Link to={`/producto/${codigo}`} className="btn"><button type="button" class="btn btn-info">Vista</button></Link>
        </div>
      </div>
    </div>
  );
};