import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './VerCitas.css'; // Importa tu archivo CSS para los estilos

const VerCitas = () => {
  const [citas, setCitas] = useState([]);

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
      const response = await fetch('http://localhost:5000/citas/', {
        method: 'GET',
      });

      if (response.status === 200) {
        const resCitas = await response.json();
        setCitas(resCitas);
      } else {
        console.error('Error al obtener las citas');
      }
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };

  useEffect(() => {
    getAllCitas();
  }, []);

  return (
    <div className="ver-citas-container">
      <h1>Listado de Citas</h1>
      <div className="citas-list">
        {citas.map((cita) => (
          <div className="cita-card" key={cita._id}>
                <div className="card-body">
                <p><strong>ID cita</strong>: {cita._id}</p>
                <p><strong>Correo cliente</strong>: {cita.correoCliente}</p>
                <p><strong>Correo barbero</strong>: {cita.correoBarbero}</p>
                <p><strong>Servicio</strong>: {cita.nombreServicio}</p>
                <p><strong>Fecha y hora</strong>: {cita.fechaCita}:00</p>
                <form onSubmit={(e) => {e.preventDefault(); onSubmitBorrar(cita._id)}}>
                    <button type="submit" className="btn-danger btn-block btn">Cancelar Cita</button>
                </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerCitas;
