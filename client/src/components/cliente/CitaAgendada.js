// CitaAgendada.js

import React, { Fragment } from "react";
import { useLocation } from "react-router-dom/";
import { useHistory } from "react-router-dom";
import './CitaAgendada.css'; // Importa tu archivo de estilos

const CitaAgendada = () => {
  const history = useHistory();
  const location = useLocation();
  const data = location.state;

  return (
    <Fragment>
      <div className="cita-container">
        <h2>Tu Cita Agendada</h2>
        <div className="cita-info">
          <p>
            <strong>Barbero:</strong> {data.barbero}
          </p>
          <p>
            <strong>Servicio:</strong> {data.nombreServicio}
          </p>
          <p>
            <strong>Precio:</strong> ${data.precio}
          </p>
          <p>
            <strong>Fecha y Hora:</strong> {data.fechaCita} a las {data.horaCita}:00 hrs.
          </p>
          <p>
            <strong>Ubicación:</strong> { /* Agrega la ubicación aquí */}
          </p>
        </div>
        <button
          className="btn btn-outline-primary btn-lg btn-block"
          onClick={(e) => {
            e.preventDefault();
            history.push("/servicios");
          }}
        >
          Agendar otra cita
        </button>
        <button
          className="btn btn-outline-secondary btn-lg btn-block"
          onClick={(e) => {
            e.preventDefault();
            history.push("/cliente/vermiscitas");
          }}
        >
          Ver mis citas
        </button>
      </div>
    </Fragment>
  );
};

export default CitaAgendada;
