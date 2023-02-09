const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required")
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User is already available")
    }

    //HashPassword
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash)
    const user = await User.create({
        username,
        email,
        password : passwordHash
    })

    console.log(`User created ${user}`)
    if (user) {
        res.status(200).json({_id:user.id,email:user.email})
    } else {
        res.status(400);
        throw new Error("User data not valid")
    }
    res.status(200).json({message: 'User registration'})
})



const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required")
    }

    const user = await User.findOne({ email });
    //compare password with Hashed password

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"})
        res.status(200).json({accessToken})
    } else {
        res.status(401)
        throw new Error("Invalid credentials")
    }
})



const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}