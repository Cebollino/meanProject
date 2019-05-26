const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Camarero = require('./camarero')
const Mesa = require('./mesa')

const schPedido = Schema({
  cdg_pedido : {
    type: String,
    required: true,
    maxlength: 50
  },
  num_mesa: {
    type: Number,
    required: true,
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
  cdg_menu: {
    type: String,
    required: true,
    maxlength: 50,
  },
  precio_menu: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("Pedido", schPedido)
