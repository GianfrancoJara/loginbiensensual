const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const servicioSchema = new Schema({
    nombreServicio: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    precioServicio: {
        type: Number,
        required: true,
        trim: true,
    },
    duracionServicio: {
        type: Number,
        required: true,
    },
    iconoServicio: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const Servicio = mongoose.model('Servicio', servicioSchema);
module.exports = Servicio;
