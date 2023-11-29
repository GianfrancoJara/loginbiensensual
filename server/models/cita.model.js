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
    },
    nombreCliente: {
        type: String,
        required: true,
        trim: true,
    },
    correoBarbero: {
        type: String,
        required: true,
        trim: true,
    },
    nombreBarbero: {
        type: String,
        required: true,
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
    precioServicio: {
        type: Number,
        required: true,
    },
    duracionServicio: {
        type: Number,
        required: true,
    },
},{
    timestamps: true,
});
citaSchema.index({correoBarbero: 1, fechaCita: 1}, {unique: true});
const Cita = mongoose.model('Cita', citaSchema);
module.exports = Cita;
