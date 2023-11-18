import React, { Fragment } from "react";
import Carrusel from "./Carrusel";
import img from "../IMG/img3.jpg";
const Inicio = () => {
    return (
      <Fragment>
        <Carrusel />
    
        <div className="section">
        <div className="containeri ">
          <div className="row visible">
            <div className="col-md-8 offset-md-2">
              <div className="voffset80"></div>
              <p className="pretitle">Conócenos</p>
              <h1 className="title">La Barbería</h1>
              <p className="subtitle colored">
                Vive la excelencia y tradición de la barbería clásica con una
                atención enfocada a satisfacer 100% a nuestros clientes.
              </p>
              <ul className="list-horizontal-links">
                <li>
                  <a href="./galeria" className="custom-btn">Nuestros trabajos</a>
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
                        En La Barbería nos hacemos responsables del cuidado
                        integral masculino a través de un servicio de excelencia
                        y arraigado en las antiguas tradiciones, en un ambiente
                        único e inspirado en las clásicas barberías de antaño,
                        con una atención de primer nivel más un amplio catálogo
                        de productos con stock permanente. Experimenta, descubre
                        y vive junto a nosotros el arte de la barbería clásica.
                        ¡Te esperamos!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <div className="section features">
        <div className="container">
        <div class="row visible">
          <div class="col-sm-4">
            <div class="horizontal-border fadeInUp">
              <div class="voffset40"></div>
              <img src={img}></img>
              <div class="voffset40"></div>
              <h4 class="titlefeat">Corte de cabello</h4>
              <div class="voffset30"></div>
              <p class="textfeat">Asesoría, corte y lavado de cabello. Incluye peinado con pomada a elección <b>$20.990</b></p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="horizontal-border fadeInUp">
              <div class="voffset40"></div>
              <img src={img}></img>
              <div class="voffset40"></div>
              <h4 class="titlefeat">Corte de cabello + Barba</h4>
              <div class="voffset30"></div>
              <p class="textfeat">Asesoría, arreglo de barba, aplicación de toalla caliente, aceite y limpieza facial <b>$20.990</b></p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="horizontal-border fadeInUp">
              <div class="voffset40"></div>
              <img src={img}></img>
              <div class="voffset40"></div>
              <h4 class="titlefeat">Corte de cabello + Diseño con navaja</h4>
              <div class="voffset30"></div>
              <p class="textfeat">Rasurado con toalla caliente, crema de afeitar y navaja más after shave <b>$20.990</b></p>
            </div>
          </div>
        </div>

        <div class="voffset80"></div>
        <div class="row visible">
          <div class="col-sm-4">
            <div class="horizontal-border fadeInUp">
              <div class="voffset40"></div>
              <img src={img}></img>
              <div class="voffset40"></div>
              <h4 class="titlefeat">Trabajo de colores o Bisos</h4>
              <div class="voffset30"></div>
              <p class="textfeat">Disfruta el corte de cabello más el perfilado de barba a un precio preferencial <b>$30.990</b></p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="horizontal-border fadeInUp">
              <div class="voffset40"></div>
              <img src={img}></img>
              <div class="voffset40"></div>
              <h4 class="titlefeat">Cursos de Barbero</h4>
              <div class="voffset30"></div>
              <p class="textfeat">Es la solución ideal para ese regalo especial. Canjéala por cualquier servicio nuestro <a href="https://www.barbalarga.cl/compra-aqui/la-barberia" target="_blank">aquí</a></p>
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
