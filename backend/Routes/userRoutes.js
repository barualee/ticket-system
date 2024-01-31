const express = require('express')
const router = express.Router()
const {registerUser, loginUser} = require('../Controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)

module.exports=router