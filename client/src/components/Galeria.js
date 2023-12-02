import React, { useState } from 'react';
import './Galeria.css';

import barba1 from "../IMG/Cortes/Barba/barba1.PNG";
import bloquecolor1 from "../IMG/Cortes/Bloque de color/bloquecolor1.PNG";
import bloquecolor2 from "../IMG/Cortes/Bloque de color/bloquecolor2.PNG";
import bloquecolor3 from "../IMG/Cortes/Bloque de color/bloquecolor3.jpg";
import bloquecolor4 from "../IMG/Cortes/Bloque de color/bloquecolor4.jpg";
import cortedecabello1 from "../IMG/Cortes/Corte de cabello/cortedecabello1.PNG"
import degrade1 from "../IMG/Cortes/Degrade/degrade1.PNG"
import diseño1 from "../IMG/Cortes/Diseño/diseño1.JPG"
import diseño2 from "../IMG/Cortes/Diseño/diseño2.JPG"
import diseño3 from "../IMG/Cortes/Diseño/diseño3.JPG"
import diseño4 from "../IMG/Cortes/Diseño/diseño4.PNG"
import diseño5 from "../IMG/Cortes/Diseño/diseño5.PNG"
import diseño6 from "../IMG/Cortes/Diseño/diseño6.jpg"
import diseño7 from "../IMG/Cortes/Diseño/diseño7.jpg"
import diseño8 from "../IMG/Cortes/Diseño/diseño8.PNG"
import diseño9 from "../IMG/Cortes/Diseño/diseño9.jpg"
import diseño10 from "../IMG/Cortes/Diseño/diseño10.jpg"
import diseño11 from "../IMG/Cortes/Diseño/diseño11.PNG"
import diseño12 from "../IMG/Cortes/Diseño/diseño12.jpg"
import platinado1 from "../IMG/Cortes/Platinado/platinado1.PNG"
import platinado2 from "../IMG/Cortes/Platinado/platinado2.MOV"



const Galeria = () => {
    
    let data = [
        {
            id: 1,
            imgSrc: barba1,
            description: "Diseño de Barba",
        },
        {
            id: 2,
            imgSrc: bloquecolor1,
            description: "Bloque de color + Diseño",
        },
        {
            id: 3,
            imgSrc: bloquecolor2,
            description: "Diseño de color",
        },
        {
            id: 4,
            imgSrc: bloquecolor3,
            description: "Platinado global",
        },
        {
            id: 5,
            imgSrc: bloquecolor4,
            description: "Bloque de color platinado",
        }
        ,
        {
            id: 6,
            imgSrc: cortedecabello1,
            description: "Corte de cabello varon",
        }
        ,
        {
            id: 7,
            imgSrc: degrade1,
            description: "Degradado",
        }
        ,
        {
            id: 8,
            imgSrc: diseño1,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 9,
            imgSrc: diseño2,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 10,
            imgSrc: diseño3,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 11,
            imgSrc: diseño4,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 12,
            imgSrc: diseño5,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 13,
            imgSrc: diseño6,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 14,
            imgSrc: diseño7,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 15,
            imgSrc: diseño8,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 16,
            imgSrc: diseño9,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 17,
            imgSrc: diseño10,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 18,
            imgSrc: diseño11,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 19,
            imgSrc: diseño12,
            description: "Diseño con navaja",
        }
        ,
        {
            id: 19,
            imgSrc: platinado1,
            description: "Platinado",
        }
        ,        
    ]

    const [model, setModel] = useState(false);
    const [imageDescription, setImageDescription] = useState('');
    const [tempimgSrc, setTempImgSrc] = useState('');
    const getImg = (imgSrc, description) =>{
        setTempImgSrc(imgSrc);
        setModel(true);
        setImageDescription(description);
    }
    return(
        <>
        <div className={model? "model open" : "model"} onClick={()=> setModel(false)}>
            <img alt = "" src={tempimgSrc}/>
            <p>{imageDescription}</p>


        </div>
        <div className="galeria">
            {data.map((item, index)=>{
                return(
                    <div className="fotos" key={index} onClick={()=> getImg(item.imgSrc, item.description)}>
                        <img src={item.imgSrc} style={{ width: '100%' }} alt={`Imagen ${item.id}`} />
                    </div>
                )
            })}
        </div>
        </>
    )

}

export default Galeria;