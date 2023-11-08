const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const servicioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    precio: {
        type: Number,
        required: true,
        trim: true,
    },
    duracion: {
        type: Number,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const Servicio = mongoose.model('Servicio', servicioSchema);
module.exports = Servicio;
