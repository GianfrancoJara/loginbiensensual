import React, {useContext, useEffect, useState} from 'react'
import { DataContext } from "./context/Dataprovider";
import { useParams } from "react-router-dom";
import { ProductoItem } from "./ProductoItem";
import "./Productos.css";


export const ProductosDetalles = () => {
  
  const value = useContext(DataContext);
  const [productos] = value.productos;
  const addCarrito = value.addCarrito;
  const [detalle, setDetalle] = useState([])
  const [url, setUrl]= useState(0)
  const [images, setImages] = useState('')
  const params = useParams();
  let item = 0;

  useEffect(() =>{
    console.log('re render' , params.id)
    item=0;
    productos.forEach(producto =>{
      console.log(producto);
      if(producto.codigo === params.id){
        setDetalle(producto)
        setUrl(0)
      }
    })
  },[params.id, productos])

  console.log(url)

  useEffect(() =>{
    const values = `${detalle.img1}${url}${detalle.img2}`;
    setImages(values) 
  },[url, params.id])

  const handleInput = (e) =>{
  const number = e.target.value.toString().padStart(2,'01')
   setUrl(number)
  }

  if(detalle.length < 1) return null;

  return (
    <>
    {
        <div className="detalles">
          <h2>{detalle.nombre}</h2>
          <p className="price">${detalle.precio}</p>
          <div className="grid">
          <p className="nuevo">Nuevo</p>
          <div className="tamano">
            <select placeholder="Tamaño" >
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
              <option value="1">4</option>
              <option value="1">5</option>
              <option value="1">6</option>
              <option value="1">7</option>
              <option value="1">8</option>
            </select>
            <p>Tamaño</p>
          </div>
          </div>
          <button onClick={() => addCarrito(detalle.codigo)} type="button" class="btn btn-primary"> Añadir al carrito </button> 
          {
            url ? <img src={images} alt={detalle.nombre}/> : <img src={detalle.image} alt={detalle.nombre}/>
          }
          <div className="description">
          <p><b>Descripción: </b>{detalle.descripcion}</p>
          <br/>
          </div>
          
        </div>
   
    }
    <h2 className="relacionados">Productos relacionados</h2>
    <div className="productos">
      {
        productos.map((producto)=>{
          if((item < 6)&&(detalle.categoria === producto.categoria)){
            item++;
          return <ProductoItem 
          key={producto.codigo}
          title={producto.nombre}
          image={producto.image}
          category={producto.categoria}
          price={producto.precio}
          codigo={producto.codigo}
          />
          }
          
        
        })
      }
     
    </div>
    </>
  )
}
