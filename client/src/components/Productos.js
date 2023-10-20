import React from 'react'
import "./Productos.css";

import imgc1 from '../IMG/catalogo/imgc1.jpg';


/// https://www.youtube.com/watch?v=iiuF7dYaWDo

export const ProductosLista = () => {
    return(
        <>
        <h1 className='title'>PRODUCTOS</h1>
        <div className='productos'>
            <div className='producto'>
            <a href='#'>
                <div className='producto__img'>
                    <img src={imgc1} alt=''/>
                </div>
                </a>
                <div className='producto__footer'>
                <h1> Buzz Cut</h1>
                <p> Corte de Pelo </p>
                <p className='price'>$8.000</p>
                </div>
                <div className='buttom'>
                    <button className='btn'>
                        Añadir al carrito
                    </button>
                    <div>
                    <a href='#' className='btn'>Vista</a>
                    </div>
                </div>
        </div>

        <div className='producto'>
            <a href='#'>
                <div className='producto__img'>
                    <img src={imgc1} alt=''/>
                </div>
                </a>
                <div className='producto__footer'>
                <h1> Title</h1>
                <p> Categoria </p>
                <p className='price'>$0</p>
                </div>
                <div className='buttom'>
                    <button className='btn'>
                        Añadir al carrito
                    </button>
                    
                    <div>
                    <a href='#' className='btn'>Vista</a>
                    </div>
                </div>
        </div>

        <div className='producto'>
            <a href='#'>
                <div className='producto__img'>
                    <img src={imgc1} alt=''/>
                </div>
                </a>
                <div className='producto__footer'>
                <h1> Title</h1>
                <p> Categoria </p>
                <p className='price'>$0</p>
                </div>
                <div className='buttom'>
                    <button className='btn'>
                        Añadir al carrito
                    </button>
                    <div>
                    <a href='#' className='btn'>Vista</a>
                    </div>
                </div>
        </div>

        

        </div>

        </>
    )
}