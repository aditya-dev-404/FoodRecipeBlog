const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')




const userSignup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Required fields cant be empty!' })
    }
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: 'User already exists!' });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username, email, password: hashPass
    })

    // JWT implementation 
    let token = jwt.sign( // this is the setup for jwt token generation this takes 3 main things
        { userId: newUser._id, email: newUser.email },// 1. paylod that identifies the user 
        process.env.JWT_SECRET, // secret key in for extra protection
        { expiresIn: '7d' } // time period in which the key will expire 
    )

    //Sending Response after generating the token 
    res.status(200).json({
        message: 'User created successfully!',
        token: token,
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    });

}
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Required fields cant be empty!' })
    }
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "User doesn't exists!" });
    }
    let isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
        const token = jwt.sign({
            userId: user._id,
            email: user.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            })
        return res.status(200).json({ token, user });
    } else {
        return res.status(400).json({ error: "Invalid credentials" });
    }
}
const getUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id).select('-password');
    if(!user){
        return res.status(404).json({error:"User not found!"});
    }else{
        return res.status(200).json({user});
    }
}

module.exports = { userSignup, userLogin, getUser }