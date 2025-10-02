const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    favourites: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Recipe' 
        }
    ]
}, {timestamps: true});

module.exports = new mongoose.model("User",userSchema);