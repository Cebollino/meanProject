const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Camarero = require('./camarero')

const schMesa = Schema({
    num_mesa: {
      type: Number,
      required: true,
      unique: true,
      maxlength: 2
    },
    id_sesion: {
        type: String,
        required: true,
        maxlength: 50
    },
    id_camarero: {
        type: Schema.Types.ObjectId,
        ref: 'Camarero'
    },
    estado: {
      type: String,
      enum: ['por_limpiar', 'ocupada', 'vacia'],
      required: true,
    }
})

module.exports = mongoose.model("Mesa", schMesa)
