const express = require("express");
const checkAuth = require('../middleware/check-auth')

const Menu = require("../models/menu");
const Pedido = require("../models/pedido");
const Mesa = require("../models/mesa")
const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  Mesa.findOne({id_sesion: req.body.id_sesion}, function(err, mesaFind) {
    const mesa = mesaFind
    Menu.findOne({cdg_menu: req.body.cdg_menu}, function(err, menuFind) {
      const pedido = new Pedido({
        cdg_pedido: mesa.num_mesa + "-" + req.body.id_sesion,
        num_mesa: mesa.num_mesa,
        id_sesion: req.body.id_sesion,
        id_camarero: mesa.id_camarero,
        cdg_menu: req.body.cdg_menu,
        precio_menu: menuFind.precio
      })
      pedido.save((err, pedidoGuardado) => {
        res.status(201).json({
          mensaje: "200",
          _id:pedidoGuardado._id
        })
      })
    })
  })
})

router.get("" , checkAuth, (req, res, next) => {
  Pedido.find().then(documents => {
      console.log(documents)
      res.status(200).json({
          mensaje: "get de pedidos",
          pedidos: documents
      })
  })

})

router.get("/:id", checkAuth, (req, res, next) => {
  Pedido.findById(req.params.id).then(pedido => {
    console.log(pedido)
    if (pedido) {
      res.status(200).json(pedido)
    } else {
      res.status(404).json({mensaje: "pedido no encontrada"})
    }
  })
})

router.put('/:id', checkAuth, (req, res, next) => {
  Pedido.findById(req.params.id).then(pedidoOld => {
    Mesa.findOne({id_sesion: req.body.id_sesion}, function(err, mesaFind) {
      const mesa = mesaFind
      Menu.findOne({cdg_menu: req.body.cdg_menu}, function(err, menuFind) {
        const pedido = new Pedido({
          _id: req.body._id,
          cdg_pedido: (mesa != null ? mesa.num_mesa : pedidoOld.num_mesa) + "-" + req.body.id_sesion,
          num_mesa: mesa != null ? mesa.num_mesa : pedidoOld.num_mesa,
          id_sesion: req.body.id_sesion,
          id_camarero: mesa != null ? mesa.id_camarero : pedidoOld.id_camarero,
          cdg_menu: req.body.cdg_menu,
          precio_menu: menuFind.precio
        })
        Pedido.updateOne({_id: req.params.id}, pedido).then(result => {
          console.log(result)
          res.status(200).json({mensaje: "200"})
        })
      })
    })
  })
})

router.delete("/:id", checkAuth, (req, res, next) => {
  Pedido.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({mensaje: "200"})
  })
})

module.exports = router;
