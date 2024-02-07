const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const user = require('../Models/userModel')
const jwt = require('jsonwebtoken')

// @desc     Register a new user
// @route    /api/users
// @access   Public
const registerUser = asyncHandler(async(req,res) => {
    const {name, email, password} = req.body
    
    //validation
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('please enter the fields')
    }
    //check if user exist
    const userExist = await user.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exist')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const User = await user.create({
        name,
        email,
        password: hashedPassword
    })

    if(User) {
        res.status(201).json({
            _id:User._id,
            name:User.name,
            email:User.email,
            token:generateToken(User._id)

        })
    }else {
        res.status(400)
        throw new error('Invalid user data')
    }
})

// @desc     Login a new user
// @route    /api/users/login
// @access   Public
const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body
    const loginUser = await user.findOne({email})

    //check if user and password matches
    if(loginUser && (await bcrypt.compare(password, loginUser.password))) {
        res.status(200).json({
            _id:loginUser._id,
            name:loginUser.name,
            email:loginUser.email,
            token:generateToken(loginUser._id)
        })
    } else{
        res.status(401)
        throw new Error('invalid credentials')
    }
})

// @desc     Get current user
// @route    /api/users/me
// @access   Private
const getMe = asyncHandler(async(req,res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'30d'
    })
}

module.exports = {registerUser, 
    loginUser, getMe
}