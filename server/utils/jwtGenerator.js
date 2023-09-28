const jwt = require("jsonwebtoken");
require('dotenv').config();


function jwtGenerator(users_id) {
    const payload = {
        user: users_id
    }
    
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 60*60 })
}

module.exports = jwtGenerator;