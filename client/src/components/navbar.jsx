import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import "../navbar.css";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [toggleIcon, setToggleIcon] = useState("nav__toggler");

  const navToggle = () => {
    setActive(active === "nav__menu" ? "nav__menu nav__active" : "nav__menu");
    setToggleIcon(toggleIcon === "nav__toggler" ? "nav__toggler toggle" : "nav__toggler");
  };

  return (

    <nav className="nav">
      <Link to="/" className="nav__brand">
        <img className="logo" src="https://thumbs.dreamstime.com/z/logotipo-del-vector-para-barber-shop-119691402.jpg" alt="" />
        Sr.Barber
      </Link>
      <ul className={active}>
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
          <a href="#" className="nav__link"> 
            Catalogo
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link"> 
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
      </ul>
      <div onClick={navToggle} className={toggleIcon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
