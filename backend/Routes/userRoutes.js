const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../Controllers/userController')


const {protect} = require("../Middleware/authMiddleWare")
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports=router