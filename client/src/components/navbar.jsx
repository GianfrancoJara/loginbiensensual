import React, { useState, useContext, useEffect, Fragment } from 'react';
import { DataContext, DataProvider } from "./context/Dataprovider";
import { Link, useLocation, useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { Carrito } from "./Carrito"
import "../navbar.css";
import logo from "../IMG/logo.png";

function Navbar(props) {
  console.log(props);
  const { setAuth, autoridad, nombreUsuario } = props;
  const history = useHistory();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isSticky, setIsSticky] = useState(false);
  const [active, setActive] = useState("nav__menu");
  const [toggleIcon, setToggleIcon] = useState("nav__toggler");
  let elementosNavbar = [];

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      
      toast.success("Te has deslogueado exitosamente... redirigiendo a inicio", {
        onClose: () => {
          history.push("/");
          window.location.reload();
        },
      });
      setAuth("visita");
      
    } catch (err) {
      console.error(err.message);
    }
  };


  if (autoridad === "visita") {
    elementosNavbar.push(
      <Fragment key="visita">
        <li className="nav__item">
          <Link to="/" className="nav__link">
            Inicio
          </Link>
        </li>
        <li className="nav__item">
          <a href="/galeria" className="nav__link">
            Galeria
          </a>
        </li>
        <li className="nav__item">
          <a href="/catalogo" className="nav__link">
            Catalogo
          </a>
        </li>
        <li className="nav__item">
          <a href="/servicios" className="nav__link">
            Agendamiento
          </a>
        </li>
        <li className="nav__item">

          <Link to="/login" className="nav__link">
            Login
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/register" className="nav__link">
            Registro
          </Link>
        </li>
      </Fragment>
    )
  }
  if (autoridad === "cliente" || autoridad === "administrador") {
    elementosNavbar.push(
      <Fragment key="cliente">
        <li className="nav__item">
          <Link to="/" className="nav__link">
            Inicio
          </Link>
        </li>
        <li className="nav__item">
          <a href="/galeria" className="nav__link">
            Galeria
          </a>
        </li>
        <li className="nav__item">
          <a href="/catalogo" className="nav__link">
            Catalogo
          </a>
        </li>
        <li className="nav__item">
          <a href="/servicios" className="nav__link">
            Agendamiento
          </a>
        </li>
        <li className="nav__item">
          <a href='/dashboard'>Hola, {props.nombreUsuario}</a>
        </li>
        <li className="nav__item">
          <a onClick={(e) => logout(e)} className="nav__link btn-logout">
            Cerrar sesión
          </a>
        </li>
      </Fragment>
    )
  }
  

  const value = useContext(DataContext);
  const [carrito] = value.carrito;
  const [menu, setMenu] = value.menu;
  const calcularCantidadTotal = (itemsCarrito) => {
    let cantidadTotal = 0;
  
    // Itera sobre los elementos del carrito y suma las cantidades
    itemsCarrito.forEach((item) => {
      cantidadTotal += item.cantidad; // Suponiendo que cada elemento tiene una propiedad 'cantidad'
    });
  
    return cantidadTotal;
  };
  
  console.log(carrito);
  const navToggle = () => {
    setActive(active === "nav__menu" ? "nav__menu nav__active" : "nav__menu");
    setToggleIcon(toggleIcon === "nav__toggler" ? "nav__toggler toggle" : "nav__toggler");
  };

  const toogleMenu = () => {
    setMenu(!menu)
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowWidth = window.innerWidth;
      let scrollThreshold;

      if (windowWidth <= 768) { // Dispositivos móviles
        scrollThreshold = 20; // 10% de la altura de la ventana
      } else { // Computadoras
        scrollThreshold = 110; // 20% de la altura de la ventana
      }

      const windowHeight = window.innerHeight;
      if (window.scrollY > (scrollThreshold / 100) * windowHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <DataProvider>
    <nav className={`nav ${isSticky ? 'sticky' : ''} ${isHomePage ? 'home-page' : 'other-page'}`}>
    <Link to="/" className="nav__brand">
      <img className="logo" src= {logo} alt="" />
        <span className='titulosrbarber'>Sr.Tomas</span>
      </Link>
      <ul className={active}>
        {elementosNavbar}
        <div className="cart" onClick={toogleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-cart" viewBox="0 0 16 16">
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg><span className="item__total">{calcularCantidadTotal(carrito)}</span>
        </div>
        <div className="menu">
          <box-icon name="menu"></box-icon>
        </div>
      </ul>
      <div onClick={navToggle} className={toggleIcon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
    </DataProvider>);
}

export default Navbar;