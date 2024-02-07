const express = require("express")
const colors = require('colors')
const dotenv = require("dotenv").config()
const connectDb = require('./Config/db')
const {errorHandler} = require('./Middleware/errorMiddleware')
const PORT = process.env.PORT

//connect DB
connectDb()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req,res) => {
    res.status(201).json({'message':"Welcome to support desk"})
})
app.use('/api/users', require('./Routes/userRoutes'))
app.use(errorHandler)
app.listen(PORT,() => console.log(`Server started on ${PORT}`))