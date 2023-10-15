const router = require("express").Router();
const authorization = require("../middleware/authorization")
let Usuario = require('../models/usuario.model');

router.get("/", authorization, async (req, res) => {
    try {
        const buscaCorreo = req.correo;
        const buscaUsuario = await Usuario.findOne({ correo: buscaCorreo })
        .catch(err => res.status(400).json("Error: " + err));
        res.json(buscaUsuario.nombre);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Error del servidor");
    }
})

module.exports = router;