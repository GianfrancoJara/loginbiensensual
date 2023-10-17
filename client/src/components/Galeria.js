import React, { useState } from 'react';
import './Galeria.css';

import img1 from '../IMG/img1.jpg';
import img2 from '../IMG/img2.jpg';
import img3 from '../IMG/img3.jpg';
import img4 from '../IMG/img4.jpg';
import img5 from '../IMG/img5.jpg';


const Galeria = () => {
    
    let data = [
        {
            id: 1,
            imgSrc: img1,
            descripcion: "sexo"
        },
        {
            id: 2,
            imgSrc: img2,
            descripcion: "sexo"
        },
        {
            id: 3,
            imgSrc: img3,
            descripcion: "sexo"
        },
        {
            id: 4,
            imgSrc: img4,
            descripcion: "sexo"
        },
        {
            id: 5,
            imgSrc: img5,
            descripcion: "sexo"
        }
    ]

    const [model, setModel] = useState(false);
    const [imgDesc, setDesc] = useState('');
    const [tempimgSrc, setTempImgSrc] = useState('');
    const getImg = (imgSrc, imgDesc) =>{
        setTempImgSrc(imgSrc);
        setModel(true);
        setDesc(imgDesc);
    }
    return(
        <>
        <div className={model? "model open" : "model"} onClick={()=> setModel(false)}>
            <img alt = "" src={tempimgSrc}/>
            <span className='descripciontesteo'>{imgDesc}</span>
        </div>
        <div className="galeria">
            {data.map((item, index)=>{
                return(
                    <div className="fotos" key={index} onClick={()=> getImg(item.imgSrc, item.descripcion)}>
                        <img src={item.imgSrc} style={{ width: '100%' }} alt={`Imagen ${item.id}`} />
                    </div>
                )
            })}
        </div>
        </>
    )

}

export default Galeria;