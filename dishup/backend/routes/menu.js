const express = require("express");
const checkAuth = require('../middleware/check-auth')

const Menu = require("../models/menu");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  const menu = new Menu({
    cdg_menu: req.body.nombre.toUpperCase() + Math.floor(Math.random() * (100 - 10) + 10),
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    tipo: req.body.tipo
  })
  console.log("adsadas")
  menu.save((err, menuGuardado) => {
    if (err) {
      res.status(200).json(err)
    } else {
      res.status(201).json({
        mensaje: "200",
        _id: menuGuardado._id
      })
    }
  })
})

router.get("" , checkAuth, (req, res, next) => {
  Menu.find().then(documents => {
      console.log(documents)
      res.status(200).json({
          mensaje: "get de menu",
          menus: documents
      })
  })
})

router.get("/:id", checkAuth, (req, res, next) => {
  Menu.findById(req.params.id).then(menu => {
    if (menu) {
      res.status(200).json(menu)
    } else {
      res.status(404).json({mensaje: "404"})
    }
  })
})

router.put('/:id' , checkAuth, (req, res, next) => {
  console.log(req.body)
  const menu = new Menu({
    _id: req.body._id,
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    tipo: req.body.tipo
  })
  console.log(menu)
  console.log(req.params.id)
  Menu.updateOne({_id: req.params.id}, menu).then(result => {
    console.log(result)
    res.status(200).json({mensaje: "200"})
  })
})

router.delete("/:id", checkAuth, (req, res, next) => {
  Menu.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({mensaje: "200"})
  })
})

module.exports = router;
