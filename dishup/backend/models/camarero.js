const mongoose = require('mongoose')

const schCamarero = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 50
    },
    apellido: {
        type: String,
        required: true,
        maxlength: 50
    },
    tlfn: {
      type: String,
      required: true,
      maxlength: 15
    },
    email: {
      type: String,
      required: true,
      maxlength: 50
    }
})

module.exports = mongoose.model("Camarero", schCamarero)
