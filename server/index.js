const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
//middleware

app.use(express.json()) //req.body
app.use(cors())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//ROUTES//

app.use(express.static('client/src/IMG'));
//register and login routes

app.use("/auth", require("./routes/jwtAuth"));

//dashboard route

app.use("/dashboard", require("./routes/dashboard"));

//horario

app.use("/barbero", require("./routes/barbero"));

//agendamiento

app.use("/agendamiento", require("./routes/agendamiento"));

//disponibilidad

app.use("/disponibilidad", require("./routes/disponibilidad"));

app.use("/productos", require("./routes/CrudProductos"));

app.use("/citas", require("./routes/CrudCitas"));

app.use("/pago", require("./routes/payment"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});