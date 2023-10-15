const router = require("express").Router()
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
let Usuario = require('../models/usuario.model');
//registering

router.post("/register",validInfo, async (req, res) => {
    try {
        // Destructure the req.body (name, email, password)
        const { name, email, password } = req.body;

        // Check if user exists (if user exists then throw an error)
        const existe = await Usuario.find({ email: email })
        .catch(err => res.status(400).json("Error: " + err))
        if (existe === undefined){
            return res.status(401).json("Usuario ya existente");
        }
        // Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Enter the new user inside our database
        let nuevoUsuario = new Usuario({
            nombre: name,
            correo: email,
            contraseña: bcryptPassword,
            autoridad : "cliente"
        })
        nuevoUsuario.save()
        .then(() => {
            const token = jwtGenerator(nuevoUsuario._id);
            const response = {
                newUser: nuevoUsuario,
                token: token
            };
            res.json(response);
        })
        .catch(err => res.status(400).json("Error: " + err));
        // Generating our jwt token

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
});

//Login route

router.post("/login",validInfo, async(req, res) =>{
    try {
        
        //1. destructure the req.bosy

        const {email, password} = req.body;

        //2. check if user doesn't exist (if not then we throw error)

        const buscaUsuario = await Usuario.findOne({ correo: email })
        .catch(err => res.status(400).json("Error: " + err));
        if (buscaUsuario === undefined){
            return res.status(401).json("Contraseña o Email incorrecto");
        }
        //3. check if incoming password is the same the database password

        const validPassword = await bcrypt.compare(password, buscaUsuario.contraseña);

        if(!validPassword){
            return res.status(401).json("Contraseña o Email incorrecto");
        }

        //4. give them the jwt token
        const token = jwtGenerator(buscaUsuario.correo);
        return res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/verify", authorization, async (req, res) =>{
    try {
        
        res.json(true);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error en el servidor");
    }
})

module.exports = router;

