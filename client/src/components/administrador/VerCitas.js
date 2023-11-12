import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";

const VerCitas = () => {

    const [citas, setCitas] = useState([]);
    let listaCitas = [];
    
    const onSubmitBorrar = async(id) => {
        try{
            const body = {id};
            const delRes = await fetch("http://localhost:5000/citas/"+id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/JSON",
                },
                body: JSON.stringify(body)
            });
            toast.success("Cita cancelada");
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
			// Actualiza el estado de productos con la lista de productos obtenida
			setCitas(resCitas);
		  } else {
			// Ocurrió un error al obtener los productos
			// Maneja el error, muestra un mensaje de error, etc.
		  }
		} catch (error) {
		  console.error('Error al obtener los productos:', error);
		}
	  };

    citas.forEach((cita) => {
        listaCitas.push(
            <div className="card" key={cita._id}>
                <div className="card-body">
                    <p>ID cita: {cita._id}</p>
                    <p>Correo cliente: {cita.correoCliente}</p>
                    <p>Correo barbero: {cita.correoBarbero}</p>
                    <p>Servicio: {cita.nombreServicio}</p>
                    <p>Fecha y hora: {cita.fechaCita}:00</p>
                <form onSubmit={(e) => {e.preventDefault(); onSubmitBorrar(cita._id)}}>
                    <button type="submit" className="btn-danger btn-block btn">Cancelar Cita</button>
                </form>
                </div>
            </div>
        )
    });

    useEffect(() => {
		getAllCitas();
	}, []);

        return (
            <div>
                <h1>Listado de Citas</h1>
                {listaCitas}
            </div>
        )    
}
export default VerCitas;