const express = require('express')
const bodyParser = require('body-parser')

const app = express()

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
    const post = req.body
    console.log(post)
    res.status(201).json({
        message: "Post added"
    })
})

app.use('/api/posts' , (req, res, next) => {
    const posts = [
        {
            id: "smtg", 
            title: "first thing", 
            amount: "0"
        },
        {
            id: "smtg2", 
            title: "second thing", 
            amount: "1"
        }
    ]

    res.status(200).json({
        message: "posts done",
        posts: posts
    })
})

module.exports = app