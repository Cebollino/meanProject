const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Camarero = require("./models/camarero")
const Mesa = require('./models/mesa')
const Menu = require('./models/menu')
const Pedido = require('./models/pedido')

const app = express()

mongoose.connect("mongodb+srv://albert:RAMFrodo871@cluster0-kceiu.mongodb.net/dishup?retryWrites=true")
.then(() => {
    console.log("conectado a la base de datos")
})
.catch(() => {
    console.log("conexion error")
})

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"

    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    )
    next()
})

// CAMAREROS

app.post("/api/camareros", (req, res, next) => {
    const camarero = new Camarero({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      tlfn: req.body.tlfn,
      email: req.body.email
    })
    camarero.save()
    console.log(camarero)
    res.status(201).json({
        message: "camarero add"
    })
})

app.get('/api/camareros' , (req, res, next) => {
    Camarero.find().then(documents => {
        console.log(documents)
        res.status(200).json({
            message: "get de camareros",
            camareros: documents
        })
    })
})

app.get("/api/camareros/:id", (req, res, next) => {
  Camarero.findById(req.params.id).then(camarero => {
    if (camarero) {
      res.status(200).json(camarero)
    } else {
      res.status(404).json({message: "camarero no encontrada"})
    }
  })
})

app.put('/api/camareros/:id' , (req, res, next) => {
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
    res.status(200).json({message: "actualizacion de camarero correcta"})
  })
})

app.delete("/api/camareros/:id", (req, res, next) => {
  Camarero.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({message: "Camarero eliminado"})
  })
})

// FIN CAMAREROS

// MESAS

app.post("/api/mesas", (req, res, next) => {
  let sesion = req.body.estado != 'vacia' ? Math.floor(Math.random() * (10000 - 10) + 10) + "-" + req.body.id_camarero : "NO SESION"
  const mesa = new Mesa({
    num_mesa: req.body.num_mesa,
    id_sesion: sesion,
    id_camarero: req.body.id_camarero,
    estado: req.body.estado,
  })
  console.log(req.body)
  console.log("asdasdsadasd")
  mesa.save(function(err) {
    if (err){
      let mensajeError = ""
      for (let errNombre in err.errors) {
        switch(err.errors[errName].type) {
          case ValidationErrors.REQUIRED:
            mensajeError = i18n('Uno de los campsos es requerido');
            break;
          case ValidationErrors.UNIQUE:
            mensajeError = i18n('Field is not valid');
            break;
        }
      }
    }
  })
  res.status(201).json({
      message: "mesa add"
  })
})

app.get('/api/mesas' , (req, res, next) => {
  Mesa.find().then(documents => {
      console.log(documents)
      res.status(200).json({
          message: "get de mesas",
          mesas: documents
      })
  })

})

app.get("/api/mesas/:id", (req, res, next) => {
  Mesa.findById(req.params.id).then(mesa => {
    if (mesa) {
      res.status(200).json(mesa)
    } else {
      res.status(404).json({message: "Mesa no encontrada"})
    }
  })
})

app.put('/api/mesas/:id' , (req, res, next) => {
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
      res.status(200).json({message: "actualizacion de mesa correcta"})
    })
  })
})

app.delete("/api/mesas/:id", (req, res, next) => {
  Mesa.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({message: "Mesa eliminada"})
  })
})

// FIN MESAS

// MENU

app.post("/api/menus", (req, res, next) => {
  const menu = new Menu({
    cdg_menu: req.body.nombre.toUpperCase() + Math.floor(Math.random() * (100 - 10) + 10),
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    tipo: req.body.tipo
  })
  console.log("adsadas")
  menu.save()
  res.status(201).json({
      message: "menu add"
  })
})

app.get('/api/menus' , (req, res, next) => {
  Menu.find().then(documents => {
      console.log(documents)
      res.status(200).json({
          message: "get de menu",
          menus: documents
      })
  })
})

app.get("/api/menus/:id", (req, res, next) => {
  Menu.findById(req.params.id).then(menu => {
    if (menu) {
      res.status(200).json(menu)
    } else {
      res.status(404).json({message: "menu no encontrada"})
    }
  })
})

app.put('/api/menus/:id' , (req, res, next) => {
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
    res.status(200).json({message: "actualizacion de menu correcta"})
  })
})

app.delete("/api/menus/:id", (req, res, next) => {
  Menu.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({message: "menu eliminado"})
  })
})

// FIN MENU

//PEDIDOS

app.post("/api/pedidos", (req, res, next) => {
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

      pedido.save()
      res.status(201).json({
          message: "pedido add"
      })
    })
  })
})

app.get('/api/pedidos' , (req, res, next) => {
  Pedido.find().then(documents => {
      console.log(documents)
      res.status(200).json({
          message: "get de pedidos",
          pedidos: documents
      })
  })

})

app.get("/api/pedidos/:id", (req, res, next) => {
  Pedido.findById(req.params.id).then(pedido => {
    console.log(pedido)
    if (pedido) {
      res.status(200).json(pedido)
    } else {
      res.status(404).json({message: "pedido no encontrada"})
    }
  })
})

app.put('/api/pedidos/:id' , (req, res, next) => {
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
          res.status(200).json({message: "actualizacion de pedido correcta"})
        })
      })
    })
  })
})

app.delete("/api/pedidos/:id", (req, res, next) => {
  Pedido.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({message: "pedido eliminada"})
  })
})

//FIN PEDIDOS

module.exports = app
