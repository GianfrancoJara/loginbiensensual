const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = async (req, res, next) => {
    try {
      
        const jwtToken = req.header("token");
        if(!jwtToken) {
            return res.status(403).json({msg: "No autorizado"});
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.correo = payload.correo;
        next(); 

    } catch (err) {
        console.error(err.message);
        return res.status(403).json("No autorizado");
    }
};