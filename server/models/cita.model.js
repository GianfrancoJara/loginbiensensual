const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const citaSchema = new Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    barbero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    fechaInicio: {
        type: String,
        required: true,
    },
    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'servicio'
    },
},{
    timestamps: true,
});

const Cita = mongoose.model('Cita', citaSchema);
module.exports = Cita;
