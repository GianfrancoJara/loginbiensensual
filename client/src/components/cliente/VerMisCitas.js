import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './VerMisCitas.css';

const VerMisCitas = () => {
  const [citas, setCitas] = useState([]);
  let listaCitas = [];

  const onSubmitBorrar = async (id) => {
    try {
      const body = { id };
      const delRes = await fetch(`http://localhost:5000/citas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify(body),
      });
      toast.success('Cita cancelada');
      getAllCitas();
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllCitas = async () => {
    try {
      const response = await fetch('http://localhost:5000/citas/miscitas/', {
        method: 'GET',
        headers: {
          token: localStorage.token,
        },
      });
      const resCitas = await response.json();
      // Actualiza el estado de productos con la lista de productos obtenida
      setCitas(resCitas);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    getAllCitas();
  }, []);

  citas.forEach((cita) => {
    listaCitas.push(
      <div className="card" key={cita._id}>
        <div className="card-body">
          <div className="cita-info">
            <div className="cita-dato">
              <span>ID cita:</span> {cita._id}
            </div>
            <div className="cita-dato">
              <span>Correo cliente:</span> {cita.correoCliente}
            </div>
            <div className="cita-dato">
              <span>Correo barbero:</span> {cita.correoBarbero}
            </div>
            <div className="cita-dato">
              <span>Servicio:</span> {cita.nombreServicio}
            </div>
            <div className="cita-dato">
              <span>Fecha y hora:</span> {cita.fechaCita}:00
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); onSubmitBorrar(cita._id); }}>
            <button type="submit" className="btn-danger btn-block btn">
              Cancelar Cita
            </button>
          </form>
        </div>
      </div>
    );
  });

  return (
    <div className="citas-container">
      <h1 className="titulo">Mis citas</h1>
      <hr />
      {listaCitas}
    </div>
  );
};

export default VerMisCitas;
