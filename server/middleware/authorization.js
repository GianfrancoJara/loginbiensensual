const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
      
        const jwtToken = req.header("token");
        console.log("Received token:", jwtToken);
        if(!jwtToken) {
            return res.status(403).json({msg: "No autorizado"});
        }
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        console.log("Decoded payload:", payload);
        req.nombre = payload.nombre;
        req.autoridad = payload.autoridad;
        req.correo = payload.correo;
        req.id_usuario = payload.id_usuario;
        next(); 

    } catch (err) {
        console.error(err.message);
        return res.status(403).json("No autorizado");
    }
};