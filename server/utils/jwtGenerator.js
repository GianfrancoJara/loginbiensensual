const jwt = require("jsonwebtoken");
require('dotenv').config();


function jwtGenerator(correo_usuario, nombre_usuario, autoridad_usuario) {
    const payload = {
        nombre: nombre_usuario,
        correo: correo_usuario,
        autoridad: autoridad_usuario
    }
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "6h" })
}

module.exports = jwtGenerator;