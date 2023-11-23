import React, { Fragment, useState, useEffect } from "react";
import {format, isAfter, isToday} from 'date-fns';
const Botones = ({ setfechaHora, dia, servicio, barbero, citas }) => {
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

    let horasDisponibles = [];
    let horaExcepcion = 25;
    let horaCitaExistente = 25;
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
            citas.forEach(citaExistente => {
                if((format(dia, formatoDia) === citaExistente.fechaCita.substring(0,10))){
                    horaCitaExistente = parseInt(citaExistente.fechaCita.substring(10, citaExistente.fechaCita.length));
                    horas = horas.filter(
                        (filtradoCitas) => !(horaCitaExistente === filtradoCitas)
                    )
                }
            })
            horasDisponibles = horas;
        }
    }

    horasDisponibles.forEach(horaCita => {
        let conteoHoras = 0;
        let conteoDisponible = horaCita;
        for (let i = 0; i < servicio.duracion; i++) {
            if(horasDisponibles.find((hr) => hr === conteoDisponible)){
                conteoDisponible = conteoDisponible + 1;
                conteoHoras = conteoHoras + 1;
            }
        }
        if(conteoHoras === servicio.duracion){
            todosBotones.push(
                <button key={horaCita} data-bs-toggle="modal" data-bs-target="#modalCalendar" className="botonperso btn btn-outline-primary btn-lg btn-block" 
                onClick={(e) => {e.preventDefault(); setfechaHora(format(dia, formatoDia)+" "+horaCita)//onClickCita(barbero, servicio, format(dia, formatoDia), horaCita)
            }}>
                    {horaCita}:00</button>);
        }
    });
    return(
        <Fragment>
            {todosBotones}
        </Fragment>
    );
}

export default Botones;
