import React, { Fragment, useState, useEffect } from "react";
import "./Servicios.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Servicios = () => {
    let mostrarServicios = [];
    const [listaServicios, setListaServicios] = useState([]);
    const getServicios = async() => {
        try{
          const getRes = await fetch("http://localhost:5000/agendamiento/servicios", {
                method: "GET"
              });
          const parsegetRes = await getRes.json();
          setListaServicios(parsegetRes);
        }
        catch(err){
          console.error(err.message);
        }
    };

    useEffect(() => {
        getServicios();
    }, []);

    listaServicios.forEach(servicio => {
        let newTo = {pathname: "/calendario/"+servicio.nombre}
        mostrarServicios.push(
            <div className="card">
            <div className="card-body">
              <h5 className="card-title">{servicio.nombre}</h5>
              <img src={servicio.foto} alt="..." class="img-fluid fotoServicio"></img>
              <p className="card-text">{servicio.descripcion}</p>
              <p className="card-text">${servicio.precio}</p>
              <p className="card-text">Duracion aproximada: {servicio.duracion}</p>
              <Link class="btn btn-primary" to={newTo} role="button">Agendar</Link>
            </div>
          </div>
        );
    });

    return (/// vista para escojer un servicio
        <Fragment>
            <div className="containerServicios">
                {mostrarServicios}
            </div>
        </Fragment>
    );
};

export default Servicios;