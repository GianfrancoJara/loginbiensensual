import React, { Fragment, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { es } from "date-fns/locale"
import {format, isAfter, isToday} from 'date-fns';
import "./Excepciones.css";

const Excepciones = () => {
  let todasExcepciones = [];
  const [listaExcepciones, setListaExcepciones] = useState([]);
  const [startDate, setStartDate] = useState(false);
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };
  const getExcepciones = async() => {
    try{
      const getRes = await fetch("http://localhost:5000/barbero/excepciones", {
            method: "GET",
            headers: { 
              token: localStorage.token }
          });
      const parsegetRes = await getRes.json();
      setListaExcepciones(parsegetRes);
    }
    catch(err){
      console.error(err.message);
    }
  };

  useEffect(() => {
    getExcepciones();
  }, [listaExcepciones]);

  const onSubmitForm = async() => {
    try{
      const formatoExcepcion = "dd/MM/yyyy HH:mm";
      const nuevaExcepcion = format(startDate, formatoExcepcion);
      const body = {nuevaExcepcion};
      const response = await fetch("http://localhost:5000/barbero/crearex",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
          token: localStorage.token
        },
        body: JSON.stringify(body)
      });
      toast.success("xd");
      getExcepciones();
    } catch (err) {
      console.error(err.message);
    }
  };
  const onSubmitDelete = async(exc) => {
    try{
      const body = {exc};
      const delRes = await fetch("http://localhost:5000/barbero/borrarex",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
          token: localStorage.token
        },
        body: JSON.stringify(body)
      });
      toast.success("Excepcion Borrada");
      getExcepciones();
    } catch (err) {
      console.error(err.message);
    }
  };

  listaExcepciones.forEach(exc => {
    todasExcepciones.push(
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Fecha: {exc.substring(0, 10)}</h5>
          <p className="card-text">Hora: {exc.substring(10)}</p>
          <form onSubmit={(e) => {e.preventDefault(); onSubmitDelete(exc)}}>
            <button type="submit" className="btn-danger btn-block btn">Borrar</button>
          </form>
        </div>
      </div>
    )
  });
  return (
    <Fragment>
    <div className="containerExcepciones">
      {/* Sección para elegir una excepción */}
      <div className="seccion-elegir">
        <h2>Elegir excepción:</h2>
        <div className="card">
          <div className="card-body card-content">
          <DatePicker
              showIcon
              minDate={new Date()}
              locale={es}
              dateFormat="d MMMM, yyyy h:mm aa"
              showTimeSelect
              timeIntervals={60}
              filterTime={filterPassedTime}
              selected={startDate}
              placeholderText={"Escoja día y hora de la excepción"}
              onChange={(date) => setStartDate(date)}
            />
            <form onSubmit={(e) => { e.preventDefault(); onSubmitForm(); }}>
              <button type="submit" className="btn-success btn-block btn">Añadir</button>
            </form>
          </div>
        </div>
      </div>

      {/* Sección de excepciones existentes */}
      <div className="seccion-existente">
        <h2>Excepciones:</h2>
        {todasExcepciones}
      </div>
    </div>
    </Fragment>

  );
};
export default Excepciones;