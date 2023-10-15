const jwt = require("jsonwebtoken");
require('dotenv').config();


function jwtGenerator(correo_usuario) {
    const payload = {
        correo: correo_usuario
    }
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 60*60 })
}

module.exports = jwtGenerator;