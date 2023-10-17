const router = require("express").Router();
let Usuario = require('../models/usuario.model');

router.get("/", async (req, res) => {
    try {
        const buscaBarbero = await Usuario.findOne({ autoridad: "administrador" })
        .catch(err => res.status(400).json("Error: " + err));
        res.json(buscaBarbero);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Error del servidor");
    }
})

module.exports = router;