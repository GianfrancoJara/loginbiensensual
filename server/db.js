const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "soyadmin",
    host: "localhost",
    port: 5432,
    database: "loginnuevo"
});

module.exports = pool;