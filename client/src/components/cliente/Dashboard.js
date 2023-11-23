import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth, auth }) => {
  const [nombre, setName] = useState("");
  const [mensajeDashboard, setMensajeDashboard] = useState("Bienvenido");
  const history = useHistory();
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });
      const parseData = await res.json();
      setName(parseData.nombre);
      setAuth(parseData.autoridad);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth("visita");
      setMensajeDashboard("Nos vemos");
      toast.success("Te has deslogueado exitosamente", {
        onClose: () => {
          window.location.href = "/";
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h2>{mensajeDashboard}, {nombre}</h2>
      <button onClick={(e) => logout(e)} className="btn btn-success">
        Cerrar sesion
      </button>

      {auth === "administrador" && (
        <div>
          <Link to="/admin/agregarproducto" className="btn btn-success">
            Agregar Producto
          </Link>
          <Link to="/admin/verproductos" className="btn btn-info ml-2">
            Ver Productos
          </Link>
          <Link to="/admin/vercitas" className="btn btn-info ml-2">
            Ver Citas
          </Link>
          <Link to="/horario" className="btn btn-info ml-2">
            Modificar horario
          </Link>
          <Link to="/excepciones" className="btn btn-info ml-2">
            Crear excepciones
          </Link>
        </div>
      )}
      {auth === "cliente" && (
        <div>
          <Link to="/cliente/vermiscitas" className="btn btn-success">
            Ver mis Citas
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
