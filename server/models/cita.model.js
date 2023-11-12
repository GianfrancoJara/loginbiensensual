const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const citaSchema = new Schema({
    codigoCita: {
        type: String,
        trim: true,
    },
    correoCliente: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    correoBarbero: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    fechaCita: {
        type: String,
        required: true,
    },
    nombreServicio: {
        type: String,
        required: true,
        trim: true,
    },
},{
    timestamps: true,
});

const Cita = mongoose.model('Cita', citaSchema);
module.exports = Cita;
