const express = require("express");
const checkAuth = require('../middleware/check-auth')

const Mesa = require("../models/mesa");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  let sesion = req.body.estado != 'vacia' ? Math.floor(Math.random() * (10000 - 10) + 10) + "-" + req.body.id_camarero : "NO SESION"
  const mesa = new Mesa({
    num_mesa: req.body.num_mesa,
    id_sesion: sesion,
    id_camarero: req.body.id_camarero,
    estado: req.body.estado,
  })
  console.log(req.body)
  console.log("asdasdsadasd")
  mesa.save(function(err, mesaGuardada) {
      res.status(201).json({
        mensaje: "200",
        _id: mesaGuardada._id
    })
  })
})

router.get("", checkAuth, (req, res, next) => {
  Mesa.find().then(documents => {
      console.log(documents)
      res.status(200).json({
          mensaje: "get de mesas",
          mesas: documents
      })
  })

})

router.get("/:id", checkAuth, (req, res, next) => {
  Mesa.findById(req.params.id).then(mesa => {
    if (mesa) {
      res.status(200).json(mesa)
    } else {
      res.status(404).json({mensaje: "Mesa no encontrada"})
    }
  })
})

router.put('/:id', checkAuth, (req, res, next) => {
  let sesion = ""

  Mesa.findById(req.body._id).then(mesaOld => {
    if (req.body.estado == 'vacia') {
      sesion = "NO SESSION"
    } else if (mesaOld.estado == 'vacia' && req.body.estado != 'vacia'){
      sesion = Math.floor(Math.random() * (10000 - 10) + 10) + "-" + req.body.id_camarero
      console.log(sesion)
    } else {
      sesion = req.body.id_sesion
    }

    const mesa = new Mesa({
      _id: req.body._id,
      num_mesa: req.body.num_mesa,
      id_sesion: sesion,
      id_camarero: req.body.id_camarero,
      estado: req.body.estado
    })
    console.log(mesa)
    console.log(req.params.id)
    Mesa.updateOne({_id: req.params.id}, mesa).then(result => {
      console.log(result)
      res.status(200).json({mensaje: "actualizacion de mesa correcta"})
    })
  })
})

router.delete("/:id", checkAuth, (req, res, next) => {
  Mesa.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({mensaje: "200"})
  })
})

module.exports = router;
