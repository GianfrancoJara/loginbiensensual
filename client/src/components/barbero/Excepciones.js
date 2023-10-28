import React, { Fragment, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
const Excepciones = () => {
  const [startDate, setStartDate] = useState(new Date());
    return (/// mostrar horario actual y vista para cambiar
        <Fragment>
          <DatePicker showTimeSelect timeIntervals={60} selected={startDate} onChange={(date) => setStartDate(date)} />
        </Fragment>
    );
};
export default Excepciones;