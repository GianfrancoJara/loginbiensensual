const router = require("express").Router();
const authorization = require("../middleware/authorization")
let Usuario = require('../models/usuario.model');


router.get("/horario", authorization, async (req, res) => {
    try {
        const correo = req.correo;
        const existe = await Usuario.findOne({ correo: correo })
        .catch(err => res.status(401).json("Error: "+err));
        if(existe === null){
            return res.status(401).json("No existe el barbero.")
        }
        res.json(existe.horarioRegular);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
});

router.post("/horario", authorization, async (req, res) => {
    try {
        const nuevoHorario = req.body.nuevoHorario;
        console.log(nuevoHorario);
        const correo = req.correo;
        const existe = await Usuario.findOneAndUpdate({ correo: correo }, { horarioRegular: nuevoHorario})
        .catch(err => res.status(401).json("Error: "+err));
        if(existe === null){
            return res.status(401).json("No existe el barbero.")
        }

        res.json("Horario actualizado");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/excepciones", authorization, async (req, res) => {
    try {
        const correo = req.correo;
        const existe = await Usuario.findOne({ correo: correo })
        .catch(err => res.status(401).json("Error: "+err));
        if(existe === null){
            return res.status(401).json("No existe el barbero.")
        }
        res.json(existe.excepcionesHorario);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
});

router.post("/crearex", authorization, async (req, res) => {
    try {
        const nuevaExcepcion = req.body.nuevaExcepcion;
        const correo = req.correo;
        const existe = await Usuario.findOne({ correo: correo })
        .catch(err => res.status(401).json("Error: "+err));
        if(existe === null){
            return res.status(401).json("No existe el barbero.")
        }
        existe.excepcionesHorario.push(nuevaExcepcion);
        existe.save();

        res.json("Excepciones actualizadas");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
});

module.exports = router;