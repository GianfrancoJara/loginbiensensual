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
        <img className="logo" src="https://thumbs.dreamstime.com/z/logotipo-del-vector-para-barber-shop-119691402.jpg"alt="" />
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
          <a href="/calendario" className="nav__link"> 
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
        <img className = "imagecart" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAT1JREFUSEvN1CEsRlEYxvHfNyMQbaaZTBNIkiJogsJIhqIwySbaREwwQzFBExRBMoJEUBTFRjCbYAI7du929+377j1cn3nLDec57/8853nPrWhwVRrc358CPhI3r9jG/G+4yzpIAWnfIZyWhdS6okWs4hgjjQC04wFN6MJ9GUi9kPcxXqLxIcbC/nqAAZyXANygNw8Q1q7Rg0nsRcKCbgJLSY6572AaW7hEfwSgDU9oQSceixy0JqLw7cNVAWQKOzjBcKotesnrmMMuQoO8OsNgEm4I+auKACGDkMUbOvBSh9CNOzwnuvdYQNClJ1vAWh3ACpaTzGaymiIHQRvm+SAi5CAJ433xXUAzbhGuIa+OMFotiHEQefjasljABmaxmUxVtlveWuEUpY2yv/LqQ+WtRQMa7uDHOcRm8H8Bn2QFNRlXu2umAAAAAElFTkSuQmCC"/>
        <span className="item__total">0</span>
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
