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

const Calendar = ({ showDetailsHandle }) => {
  let nombreServicio = useParams().id;
  const [isInit, setIsInit] = useState(false);
  const [buscaBarbero, setBarbero] = useState([]);
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

    useEffect(() => {
        getServicio();
        getBarbero();
        setIsInit(true);
      }, []);

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
                <Botones dia={day} servicio={servicioSeleccionado} barbero={buscaBarbero}/>
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
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}
    </div>
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
