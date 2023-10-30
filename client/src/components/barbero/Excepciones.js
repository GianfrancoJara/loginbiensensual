import React, { Fragment, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { es } from "date-fns/locale"
import {format, isAfter, isToday} from 'date-fns';

const Excepciones = () => {
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const [startDate, setStartDate] = useState(false);
  const onSubmitForm = async() => {
  try{
    const formatoExcepcion = "dd/MM/yyyy h:mm";
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
  } catch (err) {
    console.error(err.message);
  }
};

    return (/// mostrar horario actual y vista para cambiar
        <Fragment>
            <DatePicker 
            showIcon
            minDate={new Date()}
            locale={es}
            dateFormat="d MMMM, yyyy h:mm aa" 
            showTimeSelect 
            timeIntervals={60} 
            filterTime={filterPassedTime} 
            selected={startDate}
            placeholderText={"Escoja dia y hora de la excepcion"}
            onChange={(date) => setStartDate(date)} />
            <form onSubmit={(e) => {e.preventDefault(); onSubmitForm()}}>
            <button type="submit" className="btn-success btn-block btn">Añadir</button>
          </form>
        </Fragment>

    );
};
export default Excepciones;