const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const rutasCamareros = require("./routes/camarero")
const rutasMesas = require('./routes/mesa')
const rutasMenus = require('./routes/menu')
const rutasPedidos = require('./routes/pedido')
const rutasUsuarios = require('./routes/usuario')
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
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"

    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    )
    next()
})

// CAMAREROS

app.use("/api/camareros", rutasCamareros)

// FIN CAMAREROS

// MESAS

app.use("/api/mesas", rutasMesas)

// FIN MESAS

// MENU

app.use("/api/menus", rutasMenus)

// FIN MENU

//PEDIDOS

app.use('/api/pedidos', rutasPedidos)

//FIN PEDIDOS

app.use("/api/usuarios", rutasUsuarios)

module.exports = app
