import React, { Fragment, useState, useEffect } from "react";
import {format, isAfter, isToday} from 'date-fns';

const Botones = ({ dia, servicio, barbero }) => {
    let todosBotones = [];
    let horas = [];

    for (let i = 0; i < 24; i++){
        horas.push(i)
    }
    const ahora = new Date();
    const formatoDia = "dd/MM/yyyy"
    let reestriccionRecurrente = [0,1,2,3,4,5,6,7,21,22,23];   
    let reestriccionEspecifica = ["20/10/2023",8,9,10,14,15,18,19];

    let horasDisponibles = [];

    if(isAfter(dia, ahora) || isToday(dia, ahora)){// DESPUES DE HOY U HOY
        if(format(dia, 'EEEE') !== "Sunday"){// QUITAR DOMINGOS
            if(isToday(dia, ahora)){// HOY
                horas = horas.filter(// FILTRAR HORAS DESPUES DE AHORA + 1 HORA
                    (filtradoHoy) => ahora.getHours() + 1 < filtradoHoy
                )
            }
            horas = horas.filter(// FILTRAR CON REESTRICCION RECURRENTE
                (filtrado) => !(reestriccionRecurrente.some((e) => e === filtrado))
                );
            if(reestriccionEspecifica[0] === format(dia, formatoDia)){
                horas = horas.filter(// FILTRAR CON REESTRICCION ESPECIFICA SI APLICA
                (filtrado) => !(reestriccionEspecifica.some((e) => e === filtrado))
                );
            }
            horasDisponibles = horas;
        }
    }

    horasDisponibles.forEach(elemento => {
        todosBotones.push(
        <button key={elemento} className="botonperso btn btn-outline-primary btn-lg btn-block" 
        onClick={() => {console.log("El barbero", barbero.nombre, "le", servicio, "el", format(dia, formatoDia), "a las", elemento)}}>{elemento}:00</button>)
    });
    return(
        <Fragment>
            {todosBotones}
        </Fragment>
    );
}

export default Botones;
