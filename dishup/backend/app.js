const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Camarero = require("./models/camarero")

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
        "GET, POST, PATCH, DELETE, OPTIONS"
    )
    next()
})

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

module.exports = app
