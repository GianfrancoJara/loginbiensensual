import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom/";
import { useHistory } from "react-router-dom";

const CitaAgendada = () => {
    const history = useHistory();
    const location = useLocation();
    const data = location.state;
    console.log(location);
    return (
        <Fragment>
            <p>{data.barbero} le atenderá en la siguiente fecha: {data.fechaCita}:00 hrs.</p>
            <p>Servicio: {data.nombreServicio}</p>
            <p>Precio: ${data.precio} </p>
            <p>Inserte Ubicacion aca</p>
            <button className="btn btn-outline-primary btn-lg btn-block" 
                onClick={(e) => {e.preventDefault(); history.push('/servicios')}}>Agendar otra cita</button>
            <button className="btn btn-outline-secondary btn-lg btn-block" 
                onClick={(e) => {e.preventDefault(); history.push('/cliente/vermiscitas')}}>Ver mis citas</button>
        </Fragment>
    );
}
export default CitaAgendada;