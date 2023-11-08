import React, { Fragment, useState, useEffect } from "react";
import {format, isAfter, isToday} from 'date-fns';

const Botones = ({ dia, servicio, barbero }) => {
    const onClickCita = async(barbero, servicio, fechaCita, horaCita) => {
        try{
            const datosAgendamiento = {
                barbero: barbero,
                servicio: servicio,
                fecha: fechaCita,
                hora: horaCita 
            }
            const citaBody = {datosAgendamiento}
                const response = await fetch("http://localhost:5000/agendamiento//crearcita",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/JSON",
                token: localStorage.token
                },
                body: JSON.stringify(citaBody)
            });
            console.log("xd");
        } catch (err) {
        console.error(err.message);
        }
    }

    let todosBotones = [];
    let horas = [];
    const ahora = new Date();
    const formatoDia = "dd/MM/yyyy"
    let excepciones = [];
    if(!(barbero.excepcionesHorario === undefined)){
        excepciones = barbero.excepcionesHorario;
    }
    if(!(barbero.horarioRegular === undefined)){
        horas = barbero.horarioRegular.lunes.map((x) => x);
    }
    //let reestriccionRecurrente2 = barbero.horarioRegular.lunes;
    //let reestriccionEspecifica2 = barbero.excepcionesHorario;

    let horasDisponibles = [];
    let horaExcepcion = 25;
    if(isAfter(dia, ahora) || isToday(dia, ahora)){// DESPUES DE HOY U HOY
        if(format(dia, 'EEEE') !== "Sunday"){// QUITAR DOMINGOS
            if(isToday(dia, ahora)){// HOY
                horas = horas.filter(// FILTRAR HORAS DESPUES DE AHORA + 1 HORA
                    (filtradoHoy) => ahora.getHours() + 1 < filtradoHoy
                )
            }
            excepciones.forEach(exc => {// FILTRAR HORAS DE EXCEPCIONES
                if((format(dia, formatoDia) === exc.substring(0,10))){// FECHA = DIA
                    horaExcepcion = parseInt(exc.substring(exc.length-5,exc.length-3))
                    horas = horas.filter(
                        (filtradoExc) => !(horaExcepcion === filtradoExc)
                    )
                }
            });
            //if(reestriccionEspecifica[0].substring(0, 10) === format(dia, formatoDia)){
            //    horas = horas.filter(// FILTRAR CON REESTRICCION ESPECIFICA SI APLICA
            //    (filtrado) => !(reestriccionEspecifica.some((e) => e === filtrado))
            //    );
            //}
            horasDisponibles = horas;
        }
    }

    horasDisponibles.forEach(horaCita => {
        todosBotones.push(
        <button key={horaCita} className="botonperso btn btn-outline-primary btn-lg btn-block" 
        onClick={(e) => {e.preventDefault(); onClickCita(barbero, servicio, format(dia, formatoDia), horaCita)}}>
            {horaCita}:00</button>)
        // {(e) => {e.preventDefault(); onClickCita(barbero, servicio, format(dia, formatoDia), horaCita)}}
        //() => {console.log("El barbero", barbero.nombre, "le realizara un", servicio.nombre, "el", format(dia, formatoDia), "a las", elemento)}
    });
    return(
        <Fragment>
            {todosBotones}
        </Fragment>
    );
}

export default Botones;
