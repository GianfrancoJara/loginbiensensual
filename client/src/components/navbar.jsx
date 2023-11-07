import React, { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom'; 
import "../navbar.css";

import logo from "../IMG/logo.png"

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isSticky, setIsSticky] = useState(false);
  const [active, setActive] = useState("nav__menu");
  const [toggleIcon, setToggleIcon] = useState("nav__toggler");
  const navToggle = () => {
    setActive(active === "nav__menu" ? "nav__menu nav__active" : "nav__menu");
    setToggleIcon(toggleIcon === "nav__toggler" ? "nav__toggler toggle" : "nav__toggler");
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

    <nav className={`nav ${isSticky ? 'sticky' : ''} ${isHomePage ? 'home-page' : 'other-page'}`}>
      
      <Link to="/" className="nav__brand">
      <img className="logo" src= {logo} alt="" />
        <span className='titulosrbarber'>Sr.Barber</span>
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
        <div className="cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg><span className="item__total">0</span>
        </div>
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
