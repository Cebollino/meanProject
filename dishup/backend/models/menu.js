const mongoose = require('mongoose')

const schMenu = mongoose.Schema({
    cdg_menu: {
      type: String,
      required: true,
      unique: true,
      maxlength: 10,
    },
    nombre: {
        type: String,
        required: true,
        maxlength: 50
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
      type: String,
      required: true,
      maxlength: 100
    },
    tipo: {
      type: String,
      enum: ['bebida', 'comida'],
      required: true,
    }
})

module.exports = mongoose.model("Menu", schMenu)
