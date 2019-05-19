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

app.post("/api/camarero", (req, res, next) => {
    const camarero = new Camarero({
        title: req.body.title,
        amount: req.body.amount
    })
    camarero.save()
    console.log(camarero)
    res.status(201).json({
        message: "Post added"
    })
})

app.get('/api/camarero' , (req, res, next) => {
    Camarero.find().then(documents => {
        console.log(documents)
        res.status(200).json({
            message: "posts done",
            camareros: documents
        })
    })

})

module.exports = app
