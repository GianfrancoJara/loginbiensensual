const router = require("express").Router();
const authorization = require("../middleware/authorization")
const Cita = require("../models/cita.model");
const Servicio = require("../models/servicio.model");

router.get("/servicios", async (req, res) => {
    try {
        const listaServicios = await Servicio.find()
        .catch(err => res.status(401).json("Error: "+err));
        res.json(listaServicios);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/buscarservicio/:id", async (req, res) => {
    try {
        const buscaServicio = await Servicio.findOne({ nombre: req.params.id })
        .catch(err => res.status(401).json("Error: "+err));
        if(buscaServicio === null){
            return res.status(401).json("Servicio no existe")
        }
        else{
            return res.json(buscaServicio);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
});

router.post("/crearservicio", async (req, res) => {
    try {
        const nuevoServicio = req.body.nuevoServicio;
        const existeServicio = await Servicio.findOne({ nombre: nuevoServicio.nombre })
        .catch(err => res.status(401).json("Error: "+err));
        if(existeServicio === null){
            nuevoServicio.save();
            return res.json("Servicios actualizados");
        }
        else{
            return res.status(401).json("Servicio duplicado.")
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
});

router.post("/borrarservicio", async (req, res) => {
    try {
        const servicio = req.body.servicio;
        const borrarServicio = await Servicio.findOneAndDelete({ nombre: servicioBorrado.nombre })
        .catch(err => res.status(401).json("Error: "+err));
        if(borrarServicio === null){
            return res.status(401).json("No existe el servicio.")
        }
        else{
            return res.json("Servicio " + servicioBorrado.nombre + " borrado");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
});

router.post("/crearcita", authorization, async (req, res) => {
    try {
        const datosAgendamiento = req.body.datosAgendamiento;
        const nuevaCita = new Cita({
            cliente: req.id_usuario,
            barbero: datosAgendamiento.barbero._id,
            fechaInicio: datosAgendamiento.fecha+" "+datosAgendamiento.hora,
            servicio: datosAgendamiento.servicio._id
        });
        nuevaCita.save();
        return res.json("Cita añadida")        

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
});
module.exports = router;