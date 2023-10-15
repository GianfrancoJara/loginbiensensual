const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    urlfoto: {
        type: String,
    }
},{
    timestamps: true,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
