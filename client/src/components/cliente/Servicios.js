import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Servicios2.css";

const Servicios = () => {
  const [listaServicios, setListaServicios] = useState([]);

  const getServicios = async () => {
    try {
      const getRes = await fetch("http://localhost:5000/agendamiento/servicios", {
        method: "GET",
      });
      const parsegetRes = await getRes.json();
      setListaServicios(parsegetRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getServicios();
  }, []);

  return (
    <Fragment>
      <h1 className="titulo">Servicios</h1>
      <div className="containerServicios">
        {listaServicios.map((servicio) => (
          <div key={servicio.nombre} className="card">
            <div className="card-body">
              <h2 className="card-title">{servicio.nombre}</h2>
              <div className="img-container">
                <img src={servicio.foto} alt="Servicio" className="img-fluid fotoServicio" />
              </div>
              <p className="descripcion">{servicio.descripcion}</p>
              <div className="detalle-servicio">
                <p className="precio">${servicio.precio}</p>
                <p className="duracion">Duración (en horas):  {servicio.duracion}</p>
              </div>
              <Link className="btn btn-agendar" to={`/calendario/${servicio.nombre}`} role="button">
                Agendar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Servicios;
