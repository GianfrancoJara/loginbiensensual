import React, { Fragment } from "react";
import Carrusel from "./Carrusel";
import cortedecabello from "../IMG/cortedecabellosinbarba.jpg";
import cortedecabelloybarba from "../IMG/cortedecabello.jpg";
import cortedecabelloydiseño from "../IMG/cortedecabelloydiseño.jpg";
import bisos from "../IMG/bisos.jpg";
import cursos from "../IMG/cursos.jpg";
import cortedecabello1 from "../IMG/Cortes/Corte de cabello/cortedecabello1.PNG"
import barba1 from "../IMG/Cortes/Barba/barba1.PNG";
import diseño1 from "../IMG/Cortes/Diseño/diseño1.JPG"
import bloquecolor3 from "../IMG/Cortes/Bloque de color/bloquecolor3.jpg";
import imageninicio from "../IMG/imageninicio.jpg";

const Inicio = () => {
    return (
      <Fragment>
        <Carrusel />
    
        <div className="about-us-section">
        <div className="containeri ">
          <div className="row visible">
            <div className="col-md-8 offset-md-2">
              <div className="voffset80"></div>
              <p className="pretitle">Conócenos</p> 
              <h1 className="title">Sr. Tomas</h1>
              <p className="subtitle colored">
              Aquí en Sr. Tomas, no solo nos ocupamos de tu cabello, si no también de tu vestimenta y es por eso que trabajamos con las mejores marcas de ropa y exclusivas, para poder potenciar tu estilo al máximo nivel! puedes comprar por vía web o presencial!
              </p>
              <ul className="list-horizontal-links">
                <li>
                  <a href="./catalogo" className="custom-btn">Nuestro catalogo</a>
                  <span className="custom-slash">/</span>
                  <a href="./servicios" target="_blank" className="custom-btn">Reserva tu hora</a>
                </li>
              </ul>
              <div className="voffset90"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="voffset30"></div>

      <div id="tab" className="container-full tabsmodule">
        <div className="row">
          <div className="col-md-6">
            <div className="voffset720"></div>
            <div className="banner" id="bg-home-grid0"></div>
          </div>
          <div className="col-md-6">
            <div className="banner-tabs">
              <div className="carusel-tabs-text flickity-enabled">
                <div
                  className="flickity-viewport"
                  style={{ height: "2000px" }}
                >
                  <div className="flickity-slider">
                    <div className="carousel-cell is-selected">
                      <h2 className="title-invert">Nosotros</h2>
                      <p>
                      Bienvenido a Sr.Tomas aquí te asesoraremos tu imagen al máximo nivel! Nos haremos responsables de tu cuidado integral a través de un servicio de primer nivel, trabajando con los mejores productos del mercado, entregando una grata experiencia en un ambiente moderno. Ven a visitarnos, te esperamos!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="services-section">
      <div className="col-md-8 offset-md-2">
        <div className="voffset110"></div>
        <p className="pretitle">Experiencia</p>
        <h1 className="title">Servicios</h1>
        <p className="subtitle colored">
          Conoce algunas de nuestras especialidades y experimenta el arte de la
          barbería clásica en La Barbería.
        </p>
        <div className="voffset110"></div>
      </div>
      </div>

      <div className="section features">
        <div className="container">
        <div class="row visible">
          <div class="col-sm-4">
            <div class="horizontal-border fadeInUp">
              <div class="voffset40"></div>
              <img src={cortedecabello1}></img>
              <div class="voffset30"></div>
              <h4 class="titlefeat">Corte de cabello</h4>

              <p class="textfeat">Variedad en tipos de cortes de cabello tanto en hombre como mujeres, incluye perfilado de cejas. Duración aproximada de 1 hora. <b>$8.000</b></p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="horizontal-border fadeInUp">
              <div class="voffset40"></div>
              <img src={barba1}></img>
              <div class="voffset30"></div>
              <h4 class="titlefeat">Corte de cabello + Barba</h4>

              <p class="textfeat">Variedad en tipos de cortes de cabello y diseño de barba a elección, incluye perfilado de cejas. Duración aproximada de 1 hora. <b>$12.000</b></p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="horizontal-border fadeInUp">
              <div class="voffset40"></div>
              <img src={diseño1}></img>
              <div class="voffset30"></div>
              <h4 class="titlefeat">Corte de cabello + Diseño con navaja</h4>

              <p class="textfeat">Variedad en tipos de cortes de cabello y diseño con navaja a elección, incluye perfilado de cejas. Duración aproximada de 1 hora. <b>$9.000 o más dependiendo del diseño</b></p>
            </div>
          </div>
        </div>

        <div class="voffset80"></div>
        <div class="row visible">
          <div class="col-sm-4">
            <div class="horizontal-border fadeInUp">
              <div class="voffset40"></div>
              <img src={bloquecolor3}></img>
              <div class="voffset30"></div>
              <h4 class="titlefeat">Trabajo de colores o Bisos</h4>

              <p class="textfeat">Trabajos de colores y bisos tanto en hombres como mujeres. Duración aproximada: 4 horas.<b>$30.000 o más dependiendo del trabajo</b></p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="horizontal-border fadeInUp">
              <div class="voffset40"></div>
              <img src={cursos}></img>
              <div class="voffset30"></div>
              <h4 class="titlefeat">Cursos de Barbero</h4>
              <p class="textfeat">Cursos completos de barberia, nos adaptamos a tus tiempos. <b>$150.000</b> </p>
            </div>
          </div>
        </div>

        <div class="voffset110"></div>
      </div>
    </div>




    
        </Fragment>

    )
};

export default Inicio;
