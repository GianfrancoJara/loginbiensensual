import React from "react";
import './Footer.css';


const Footer = () => {
    return (
        <footer className="footer">
  	 <div className="container">
  	 	<div className="row">
  	 		<div className="footer-col">
  	 			<h4>Sr.Barber</h4>
  	 			<ul>
  	 				<li><a href="/inicio">Inicio</a></li>
  	 				<li><a href="/galeria">Galeria</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>KE PONEMOS AKI?</h4>
  	 			<ul>
  	 				<li><a href="#">FAQ</a></li>
  	 				<li><a href="#">shipping</a></li>
  	 				<li><a href="#">returns</a></li>
  	 				<li><a href="#">order status</a></li>
  	 				<li><a href="#">payment options</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Tienda Online</h4>
  	 			<ul>
  	 				<li><a href="/catalogo">Catalogo</a></li>
  	 				<li><a href="/calendario">Agendamiento</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Siguenos</h4>
  	 			<div className="social-links">
                   <a href="#"><img src="../IMG/fb.png"/></a>
                   <a href="#"><img src="../IMG/ig.png"/></a>
                   <a href="#"><img src="../IMG/twitter.png"/></a>
  	 			</div>
  	 		</div>
  	 	</div>

  	 </div>
     
       <hr></hr>

        <div className="sb__footer-below">
            <div className="sb__footer-copyright">
                <p>
                @{new Date().getFullYear()} SrBarber. All right reserved.
                </p>
            </div>
            <div className="sb__footer-below-links">
                <a href="/Inicio"><div><p>Terminos y condiciones</p></div></a>
                <a href="/Inicio"><div><p>Privacidad</p></div></a>
                <a href="/Inicio"><div><p>Seguridad</p></div></a>
                <a href="/Inicio"><div><p>Cookie Declaration</p></div></a>
            </div>
        </div>
  </footer>
    )
}

export default Footer;