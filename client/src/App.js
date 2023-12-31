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
import Details from "./components/Details";
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

      const parseRes = await res.json();
      parseRes === true ? (setIsAuthenticated(true)) : (setIsAuthenticated(false));
      console.log(isAuthenticated, parseRes);
    } catch (err) {
      console.error(err.message);
    } finally{
      setIsInit(true);
    }
  };
  const [isAuthenticated, setIsAuthenticated] = useState();

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
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
                  !isAuthenticated ? (
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
                  !isAuthenticated ? (
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
                  isAuthenticated ? (
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
                  isAuthenticated ? (
                    <Catalogo {...props} setAuth={setAuth} />
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
