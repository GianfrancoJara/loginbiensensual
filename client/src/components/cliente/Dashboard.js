import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [nombre, setName] = useState("");
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
      toast.success("Te has deslogueado exitosamente", {
        onClose: () => {
          history.push("/");
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
      <h1 className="mt-5">Dashboard</h1>
      <h2>Welcome {nombre}</h2>
      <button onClick={(e) => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
