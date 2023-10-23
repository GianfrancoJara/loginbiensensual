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
import Dashboard from "./components/Dashboard";
import Galeria from "./components/Galeria";
import Catalogo from "./components/Catalogo";
import Calendar from "./components/Calendar";
import Servicios from "./components/Servicios";
import Details from "./components/Details";
import Horario from "./components/barbero/Horario";
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
  // FIN CONFIGURACION CALENDARIO
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });
      let guestName = "visita";
      const parseRes = await res.json();
      parseRes === "cliente" || parseRes === "administrador" || parseRes === "barbero" ? 
      (setIsAuthenticated(parseRes)) 
      : (setIsAuthenticated(guestName));
    } catch (err) {
      console.error(err.message);
    } finally{
      setIsInit(true);
    }
  };
  const [isAuthenticated, setIsAuthenticated] = useState("visita");

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
                path="/calendario"
                render={props =>
                  <Calendar showDetailsHandle={showDetailsHandle}  {...props}/>
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
