const router = require("express").Router();
const authorization = require("../middleware/authorization")
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
module.exports = router;