const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup
const userSignup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Required fields cant be empty!' });
    }
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists!' });

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashPass });

    const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.status(200).json({
        message: 'User created successfully!',
        token,
        user: { id: newUser._id, username: newUser.username, email: newUser.email }
    });
};

// Login
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Required fields cant be empty!' });

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User doesn't exist!" });

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user });
};

// Get user info
const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ error: "User not found!" });
    res.status(200).json({ user });
};


// Add to favourites
const addFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const recipeId = req.params.recipeId;

    if (!user.favourites.includes(recipeId)) {
      user.favourites.push(recipeId);
      await user.save();
    }

    res.json({ message: "Added to favourites", favourites: user.favourites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove from favourites
const delFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const recipeId = req.params.recipeId;

    user.favourites = user.favourites.filter(id => id.toString() !== recipeId);
    await user.save();

    res.json({ message: "Removed from favourites", favourites: user.favourites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all favourites
const getFavourites = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate("favourites"); // make sure 'favourites' exists
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json(user.favourites);
    } catch (err) {
        console.error("Error in getFavourites:", err.message);
        res.status(500).json({ error: "Failed to get favourites" });
    }
};


module.exports = { userSignup, userLogin, getUser, addFavourites, delFavourites, getFavourites };
