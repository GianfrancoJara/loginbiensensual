const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const horarioRegularSchema = new Schema({
    lunes: {
        type: [Number]
    },
    martes: {
        type: [Number]
    },
    miercoles: {
        type: [Number]
    },
    jueves: {
        type: [Number]
    },
    viernes: {
        type: [Number]
    },
    sabado: {
        type: [Number]
    },
    domingo: {
        type: [Number]
    },
});

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    contraseña: {
        type: String,
        required: true,
        minlength: 3
    },
    autoridad: {
        type: String,
        required: true,
    },
    horarioRegular: horarioRegularSchema,
    excepcionesHorario : {
        type: [String]
    },
    urlfoto: {
        type: String,
    }
},{
    timestamps: true,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
