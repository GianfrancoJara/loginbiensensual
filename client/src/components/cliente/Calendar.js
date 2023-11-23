import React, { Fragment, useState, useEffect } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import {
    es
} from "date-fns/locale"
import Botones from "./Botones";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./Calendar.css";
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';

const Calendar = ({ showDetailsHandle }) => {
  const history = useHistory();
  const [fechaHora, setfechaHora] = useState("no seleccionada");
  let nombreServicio = useParams().id;
  const [isInit, setIsInit] = useState(false);
  const [buscaBarbero, setBarbero] = useState([]);
  const [buscaCitas, setCitas] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const getServicio = async () => {
      try {
        const serRes = await fetch("http://localhost:5000/agendamiento/buscarservicio/"+nombreServicio, {
          method: "GET"
        });
        const parseSerRes = await serRes.json();
        setServicioSeleccionado(parseSerRes);
      }
      catch(err){
        console.error(err.message);
      }
  }
    const getBarbero = async () => {
    try {
        const res = await fetch("http://localhost:5000/disponibilidad/", {
            method: "GET"
        });
        const parseData = await res.json();
        setBarbero(parseData);
    } catch (err) {
        console.error(err.message);
    }};
    const getCitas = async () => {
      try {
          const res = await fetch("http://localhost:5000/citas/", {
              method: "GET"
          });
          const parseData = await res.json();
          setCitas(parseData);
      } catch (err) {
          console.error(err.message);
      }};

    useEffect(() => {
        getServicio();
        getBarbero();
        getCitas();
        setIsInit(true);
      }, []);

      const onClickCita = async(barbero, servicio, fechaCita, horaCita) => {
        try{
            const datosCita = {
                correoBarbero: barbero.correo,
                nombreBarbero: barbero.nombre,
                fechaCita: fechaHora,
                nombreServicio: servicio.nombre,
                precioServicio: servicio.precio
            }
            console.log(datosCita);
            const body = {datosCita}
                const response = await fetch("http://localhost:5000/citas",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/JSON",
                token: localStorage.token
                },
                body: JSON.stringify(body)
            });
            console.log(response);
            if(response.status === 200){
                history.push({
                    pathname: '/citaagendada',
                    state: {
                        barbero: barbero.correo,
                        fechaCita: fechaHora,
                        nombreServicio: datosCita.nombreServicio,
                        precio: servicio.precio
                    }
            });
            }
            else{
                toast.error("Ocurrió un error")
            }
        } catch (err) {
        console.error(err.message);
        }
    };

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());


  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    //console.log("current week", currentWeek);
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    // console.log("selected day", selectedDate);
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
           <div className="icon" onClick={() => changeMonthHandle("prev")}>
            Mes Anterior
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat, { locale: es})}</span>
        </div>
        <div className="col col-end">
          <div className="icon" onClick={() => changeMonthHandle("next")}>Siguiente Mes</div>
        </div>
      </div>
    );
  };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 6; i++) {// chao domingo
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat, { locale: es})}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    endDate.setDate(endDate.getDate()- 1) // chao domingo
    const dateFormat = "d";
    const completeDateFormat= "dd/MM/yyyy";
    let completeDate = "";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 6; i++) {// chao domingo
        formattedDate = format(day, dateFormat);
        completeDate = format(day, completeDateFormat);
        const cloneDay = day;
        days.push(
          <Fragment>
          <div
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}>
            <span className="">{formattedDate}</span>
                <Botones setfechaHora={setfechaHora} dia={day} servicio={servicioSeleccionado} barbero={buscaBarbero} citas={buscaCitas}/>
          </div>
          </Fragment>
          
        );


        day = addDays(day, 1);
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
        
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
  const renderFooter = () => {
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => changeWeekHandle("prev")}>
            Semana anterior
          </div>
        </div>
        {//<div>{currentWeek}</div>
        }
        <div className="col col-end" onClick={() => changeWeekHandle("next")}>
          <div className="icon">Siguiente semana</div>
        </div>
      </div>
    );
  };
  if(!isInit){
    return <div></div>;
  }
  else{
    return (
      <Fragment>
        <div class="modal fade" id="modalCalendar" tabindex="-1" aria-labelledby="modalCalendarLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalCalendarLabel">Confirmar agendamiento</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Servicio: {servicioSeleccionado.nombre}</p>
              <p>Fecha y hora: {fechaHora}:00 hrs </p>
              <p>Precio: {servicioSeleccionado.precio}</p>
            </div>
            <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal" class="btn btn-primary" 
            onClick={(e) => {e.preventDefault(); 
              onClickCita(buscaBarbero, servicioSeleccionado, fechaHora)}}>Confirmar</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>

        <div className="calendar">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
          {renderFooter()}
        </div>
      </Fragment>
  );
  }};

export default Calendar;
/**
 * Header:
 * icon for switching to the previous month,
 * formatted date showing current month and year,
 * another icon for switching to next month
 * icons should also handle onClick events to change a month
 */
