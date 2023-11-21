import React, {useContext, useEffect, useState} from 'react'
import { DataContext } from "./context/Dataprovider";
import { useParams } from "react-router-dom";
import { ProductoItem } from "./ProductoItem";
import "./cliente/Productos.css";


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
          {
            url ? <img src={images} alt={detalle.nombre}/> : <img src={detalle.imageUrl} alt={detalle.nombre}/>
          }
          <h2>{detalle.nombre}</h2>
          <p className="price">${detalle.precio}</p>
          <div className="grid">
         
          
          </div>
          <button onClick={() => addCarrito(detalle.codigo)} type="button" class="btn btn-primary"> Añadir al carrito </button> 
          
          <div className="description">
          <p><b>Descripción: </b>{detalle.descripcion}</p>
          <br/>
          </div>
          
        </div>
   
    }
    <h2 className="relacionados">Productos relacionados</h2>
    <div className="productos">
      {
        productos.map((relacionado)=>{
          console.log(relacionado.categoria);
          if((item < 6)&&(detalle.categoria === relacionado.categoria)){
            item++;
          return <ProductoItem 
          key={relacionado.codigo}
          nombre={relacionado.nombre}
          imageUrl={relacionado.imageUrl}
          categoria={relacionado.categoria}
          precio={relacionado.precio}
          codigo={relacionado.codigo}
          />
          }
          
        
        })
      }
     
    </div>
    </>
  )
}