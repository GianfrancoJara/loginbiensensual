import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
const Horario = () => {
    const [inputs, setInputs] = useState({
        inicioHorario: 0,
        finHorario: 0
    });
    const {inicioHorario, finHorario} = inputs;   
    const [horarioActual, setHorarioActual] = useState("");
    const getHorario = async () => {
        try {
          const res = await fetch("http://localhost:5000/barbero/horario", {
            method: "GET",
            headers: { 
              token: localStorage.token }
          });
          const parseData = await res.json();
          setHorarioActual(parseData);
        } catch (err) {
          console.error(err.message);
        }
      };

      useEffect(() => {
        getHorario();
      }, []);

    const onChange = e => 
    setInputs({...inputs, [e.target.name]: parseInt(e.target.value)});

    const onSubmitForm = async e => {
        e.preventDefault();
        console.log(inicioHorario, finHorario)
        let nuevoHorario = {
            lunes: [],
            martes: [],
            miercoles: [],
            jueves: [],
            viernes: [],
            sabado: [],
            domingo: []
        };
        if(inicioHorario < finHorario){
            try {
                let tArray = [];
                for (let i = inicioHorario; i <= finHorario; i++) {
                    tArray.push(i);
                }
                nuevoHorario.lunes =
                nuevoHorario.martes =
                nuevoHorario.miercoles =
                nuevoHorario.jueves =
                nuevoHorario.viernes =
                nuevoHorario.sabado = tArray;

                const body = {nuevoHorario};
                const response = await fetch("http://localhost:5000/barbero/horario",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/JSON",
                        token: localStorage.token
                    },
                    body: JSON.stringify(body)
                });
                toast.success("Nuevo horario definido");
                setHorarioActual(nuevoHorario);
            } catch (err) {
              console.error(err.message);
            }    
        }
        else{
            toast.error("Horario no válido");
        }
      };

    return (/// mostrar horario actual y vista para cambiar
        <Fragment>
            <div className="containerHorario">
                <div className="HorarioActual">
                    <p>Horario regular lunes: {horarioActual.lunes}</p>
                    <p>Horario regular martes: {horarioActual.martes}</p>
                    <p>Horario regular miercoles: {horarioActual.miercoles}</p>
                    <p>Horario regular jueves: {horarioActual.jueves}</p>
                    <p>Horario regular viernes: {horarioActual.viernes}</p>
                    <p>Horario regular sabado: {horarioActual.sabado}</p>
                </div>

                <div className="establecerHorario">
                    <form onSubmit={onSubmitForm}>
                        <label for="select1">Hora inicio de jornada</label>
                        <select name="inicioHorario" class="form-control" id="select1" onChange={e => onChange(e)}>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                        </select>
                        <label for="select2">Hora término de jornada</label>
                        <select name="finHorario" class="form-control" id="select2" onChange={e => onChange(e)}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                        </select>
                        <button type="submit" className="btn-success btn-block btn">Cambiar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Horario;