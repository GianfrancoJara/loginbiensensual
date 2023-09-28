const router = require("express").Router()
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registering

router.post("/register",validInfo, async (req, res) => {
    try {
        // Destructure the req.body (name, email, password)
        const { name, email, password } = req.body;

        // Check if user exists (if user exists then throw an error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length !== 0) {
            return res.status(401).send("Usuario ya existente");
        }

        // Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Enter the new user inside our database
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );

        // Generating our jwt token
        const token = jwtGenerator(newUser.rows[0].users_id);

        // Combine both responses into a single JSON object
        const response = {
            newUser: newUser.rows[0],
            token: token
        };

        res.json(response);
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

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length === 0){
            return res.status(401).json("Contraseña o Email incorrecto");
        }

        //3. check if incoming password is the same the database password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword){
            return res.status(401).json("Contraseña o Email incorrecto");
        }

        //4. give them the jwt token
        const token = jwtGenerator(user.rows[0].users_id);

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

