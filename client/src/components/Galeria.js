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
        },
        {
            id: 2,
            imgSrc: img2,
        },
        {
            id: 3,
            imgSrc: img3,
        },
        {
            id: 4,
            imgSrc: img4,
        },
        {
            id: 5,
            imgSrc: img5,
        }
    ]

    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempImgSrc] = useState('');
    const getImg = (imgSrc) =>{
        setTempImgSrc(imgSrc);
        setModel(true);

    }
    return(
        <>
        <div className={model? "model open" : "model"}>
            <img alt = "" src={tempimgSrc} />
            <i class="bi bi-x-lg"></i>
        </div>
        <div className="galeria">
            {data.map((item, index)=>{
                return(
                    <div className="fotos" key={index} onClick={()=> getImg(item.imgSrc)}>
                        <img src={item.imgSrc} style={{ width: '100%' }} alt={`Imagen ${item.id}`} />
                    </div>
                )
            })}
        </div>
        </>
    )

}

export default Galeria;