const express = require("express")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT

const app = express()
app.get("/", (req,res) => {
    res.status(201).json({'message':"Welcome to support desk"})
})
app.listen(PORT,() => console.log(`Server started on ${PORT}`))