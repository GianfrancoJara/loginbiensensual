import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { ProductosDetalles } from "./components/ProductosDetalles";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { toast } from "react-toastify";


//components

import RecuperacionContraseña from './components/RecuperacionContraseña';
import RestablecimientoContraseña from './components/RestablecimientoContraseña';
import ResetPassword from './components/RestablecimientoContraseña';
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/cliente/Dashboard";
import Galeria from "./components/Galeria";
import Catalogo from "./components/cliente/Catalogo";
import Calendar from "./components/cliente/Calendar";
import Servicios from "./components/cliente/Servicios";
import Details from "./components/cliente/Details";
import { DataProvider } from "./components/context/Dataprovider";
import { Carrito } from "./components/Carrito";
import AgregarProducto from "./components/administrador/AgregarProducto";
import VerProductos from "./components/administrador/VerProductos";
import VerCitas from "./components/administrador/VerCitas"; 
import Horario from "./components/barbero/Horario";
import Excepciones from "./components/barbero/Excepciones";
import VerMisCitas from "./components/cliente/VerMisCitas";
import dotenv from 'dotenv';
import CitaAgendada from "./components/cliente/CitaAgendada";
dotenv.config();
toast.configure();
const queryParameters = new URLSearchParams(window.location.search);
let mensajePago = "";
const statusPago = queryParameters.get("statuspago");
if(statusPago === "success"){
  mensajePago = "Pago realizado con éxito";
  localStorage.removeItem("dataCarrito");
  //mandar notificacion por correo
}
if(statusPago === "failure"){
  mensajePago = "No se ha podido realizar el pago";
}
if(statusPago === "pending"){
  mensajePago = "Pago pendiente";
}
if(statusPago){
  toast.info(mensajePago);
}
function App() {
  // CONFIGURACION CALENDARIO
  const [isInit, setIsInit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);
  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };
  let guestName = "visita";
  // FIN CONFIGURACION CALENDARIO
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });
      const parseRes = await res.json();
      if(parseRes.autoridad === "cliente" || parseRes.autoridad === "administrador" || parseRes.autoridad === "barbero"){
        guestName = parseRes.autoridad;
      }
      setNombreUsuario(parseRes.nombre);
      setIsAuthenticated(guestName);
    } catch (err) {
      console.error(err.message);
    } finally{
      setIsInit(true);
    }
  };
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [nombreUsuario, setNombreUsuario] = useState("Visita");

  const setAuth = autoridadNueva => {
    setIsAuthenticated(autoridadNueva);
  };

  useEffect(() => {
    checkAuthenticated();
  },[]);
  
  if(!isInit){
    return <div></div>;
  }
  else{
    return (

      <Fragment>
        <DataProvider>
        <Router>
        <Navbar nombreUsuario={nombreUsuario} autoridad={isAuthenticated} />
        <Carrito/>
          <div className="container">
            
            <Switch>

            <Route
                exact
                path="/recuperar-contraseña"
                render={(props) =>
                  isAuthenticated === "visita" ? (
                    <RecuperacionContraseña {...props} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
              <Route
                exact
                path="/restablecer-contraseña"
                render={(props) =>
                  isAuthenticated === "visita" ? (
                    <RestablecimientoContraseña {...props} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />

            <Route path="/reset-password/:token" component={ResetPassword} />

            <Route
                exact
                path="/"
                render={props =>
                  <Inicio {...props} setAuth={setAuth} />
                }
              />
              <Route
                exact
                path="/login"
                render={props =>
                  isAuthenticated === "visita" ? (
                    <Login {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
              <Route
                exact
                path="/register"
                render={props =>
                  isAuthenticated === "visita" ? (
                    <Register {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard"
                render={props =>
                  !(isAuthenticated === "visita") ? (
                    <Dashboard {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/galeria"
                render={props =>
                  <Galeria {...props} setAuth={setAuth} />
                }
              />
              <Route
                exact
                path="/catalogo"
                render={props =>
                  !(isAuthenticated === "visita") ? (
                    <Catalogo {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/servicios"
                render={props =>
                  !(isAuthenticated === "visita") ? (
                    <Servicios {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/horario"
                render={props =>
                  (isAuthenticated === "administrador") ? (
                    <Horario {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/excepciones"
                render={props =>
                  (isAuthenticated === "administrador" || isAuthenticated === "barbero") ? (
                    <Excepciones {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/calendario/:id"
                render={props =>
                  <Calendar showDetailsHandle={showDetailsHandle}  {...props}/>
                }
              />
              <Route path="/producto/:id" exact component={ProductosDetalles} />
              <Route
                exact
                path="/admin/agregarproducto"
                render={props =>
                  <AgregarProducto {...props} setAuth={setAuth} />
                }
              />
              <Route
                exact
                path="/admin/verproductos"
                render={props =>
                  <VerProductos {...props} setAuth={setAuth} />
                }
              />
              <Route
                exact
                path="/admin/vercitas"
                render={props =>
                  <VerCitas {...props} setAuth={setAuth} />
                }
              />
              <Route
                exact
                path="/cliente/vermiscitas"
                render={props =>
                  <VerMisCitas {...props} setAuth={setAuth} />
                }
              />
              <Route
                exact
                path="/citaagendada"
                render={props =>
                  <CitaAgendada {...props} setAuth={setAuth} />
                }
              />
            </Switch>
          </div>
          
          <div>
          <Footer />
          </div>
        </Router>
        </DataProvider>
      </Fragment>

    );
  }
}

export default App;