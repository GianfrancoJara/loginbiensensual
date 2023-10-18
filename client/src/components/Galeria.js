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
            description: "SEXO DURO",
        },
        {
            id: 2,
            imgSrc: img2,
            description: "SEXO DURO",
        },
        {
            id: 3,
            imgSrc: img3,
            description: "SEXO DURO",
        },
        {
            id: 4,
            imgSrc: img4,
            description: "SEXO DURO",
        },
        {
            id: 5,
            imgSrc: img5,
            description: "SEXO DURO",
        }
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