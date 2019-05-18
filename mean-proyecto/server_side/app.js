const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Post = require("./models/post")

const app = express()

mongoose.connect("mongodb+srv://albert:RAMFrodo871@cluster0-kceiu.mongodb.net/test01?retryWrites=true")
.then(() => {
    console.log("conexion to database succesfull")
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

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        amount: req.body.amount
    })
    post.save()
    console.log(post)
    res.status(201).json({
        message: "Post added"
    })
})

app.get('/api/posts' , (req, res, next) => {
    Post.find().then(documents => {
        console.log(documents)
        res.status(200).json({
            message: "posts done",
            posts: documents
        })
    })
    
})

module.exports = app