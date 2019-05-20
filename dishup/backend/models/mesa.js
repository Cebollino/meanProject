const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Camarero = require('./camarero')

const schMesa = Schema({
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
      required: true,
      maxlength: 15
    }
})

module.exports = mongoose.model("Mesa", schMesa)
