import React from 'react'
import cimg1 from "../IMG/cimg1.jpg";
import cimg2 from "../IMG/cimg2.jpg";
import cimg3 from "../IMG/cimg3.jpg";
 

///https://www.youtube.com/watch?v=juhVoX2k5eA

const Carrusel = () => {
    return(
        <div className='carrusel'>
        <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={cimg1} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={cimg2} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={cimg3} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>

    );
};

export default Carrusel