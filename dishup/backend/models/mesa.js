const mongoose = require('mongoose')

const schMesa = mongoose.Schema({
    id_sesion: {
        type: String,
        required: true,
        maxlength: 50
    },
    id_camarero: {
        type: String,
        required: true,
        maxlength: 2
    },
    estado: {
      type: String,
      required: true,
      maxlength: 15
    }
})

module.exports = mongoose.model("Mesa", schMesa)
