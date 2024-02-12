const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error ('All fields are mandatory')
    }
    const userAvailable = await Users.findOne({email:email})
    if(userAvailable){
        res.status(400)
        throw new Error ('User already registerd')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('the hashed password is ', hashedPassword)
    const user = await Users.create({
        username,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201)
        res.json({id: user._id, email: user.email})
    } else {
        res.status(400)
        throw new Error ('User data is not valid')
    }
}) 

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error ('All fields are mandatory')
    }
    const user = await Users.findOne({email})
    console.log(user)
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({accessToken})
    } else {
        res.status(401)
        throw new Error ('email or password is not correct')
    }
})

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}

