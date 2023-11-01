import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { toast } from "react-toastify";

//components

import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/cliente/Dashboard";
import Galeria from "./components/Galeria";
import Catalogo from "./components/cliente/Catalogo";
import Calendar from "./components/cliente/Calendar";
import Servicios from "./components/cliente/Servicios";
import Details from "./components/cliente/Details";
import Horario from "./components/barbero/Horario";
import Excepciones from "./components/barbero/Excepciones";
toast.configure();


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
      setIsAuthenticated(guestName);
    } catch (err) {
      console.error(err.message);
    } finally{
      setIsInit(true);
    }
  };
  const [isAuthenticated, setIsAuthenticated] = useState();

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
        <Router>
          <div>
          <Navbar />
          </div>
          <div className="container">
            <Switch>
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
                  (false) ? (
                    <Redirect to="/servicios" />
                  ) : (
                    <Calendar showDetailsHandle={showDetailsHandle}  {...props}/>
                  )
                }
              />
            </Switch>
          </div>
          <div>
          <Footer />
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default App;
