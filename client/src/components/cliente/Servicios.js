import React, { Fragment, useState, useEffect } from "react";
import "./Servicios.css";

const Servicios = ({nombreCliente}) => {
    return (/// vista para escojer un servicio
        <Fragment>
            <div className="containerServicios">
                <div className="servicio">
                    <a href='#'>
                        <img className="fotoServicio" src="https://s.abcnews.com/images/GMA/haircut-gty-jt-200417_hpMain.jpg" alt=''/>
                        <div className="centrado">Corte de pelo</div>
                    </a>
                </div>
                <div className="servicio">
                    <a href='#'>
                        <img className="fotoServicio" src="https://www.diplomatsalon.ae/wp-content/uploads/2015/04/beard-002.jpg" alt=''/>
                        <div className="centrado">Rasurado de barba</div>
                    </a>
                </div>
                <div className="servicio">
                    <a href='#'>
                        <img className="fotoServicio" src="https://www.beyoung.in/blog/wp-content/uploads/2020/04/Short-Haircuts-for-Men-min-853x1024.jpg" alt=''/>
                        <div className="centrado">Corte de pelo + Rasurado de barba</div>
                    </a>
                </div>
            </div>
        </Fragment>
    );
};

export default Servicios;