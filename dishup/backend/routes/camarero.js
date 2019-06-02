const express = require("express");
const checkAuth = require('../middleware/check-auth')

const Camarero = require("../models/camarero");

const router = express.Router();

router.post("", checkAuth,(req, res, next) => {
  const camarero = new Camarero({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    tlfn: req.body.tlfn,
    email: req.body.email
  })
  camarero.save((err, camareroGuardado) => {
    console.log(camareroGuardado)
    res.status(201).json({
        mensaje: "200",
        _id:camareroGuardado._id
    })
  })
})

router.get("" , (req, res, next) => {
  Camarero.find().then(documents => {
      console.log(documents)
      res.status(200).json({
          mensaje: "get de camareros",
          camareros: documents
      })
  })
})

router.get("/:id", checkAuth, (req, res, next) => {
  Camarero.findById(req.params.id).then(camarero => {
    if (camarero) {
      res.status(200).json(camarero)
    } else {
      res.status(404).json({mensaje: "404"})
    }
  })
})

router.put('/:id', checkAuth, (req, res, next) => {
  console.log(req.body)
  const camarero = new Camarero({
    _id: req.body._id,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    tlfn: req.body.tlfn,
    email: req.body.email
  })
  console.log(camarero)
  console.log(req.params.id)
  Camarero.updateOne({_id: req.params.id}, camarero).then(result => {
    console.log(result)
    res.status(200).json({mensaje:  200})
  })
})

router.delete("/:id", checkAuth, (req, res, next) => {
  Camarero.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({mensaje: "200"})
  })
})

module.exports = router;
