/* This code snippet is defining a Mongoose schema for 
a recipe in a Node.js application. Here's a
breakdown of what each part is doing: */
const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    ingredients:{
        type: Array,
        required: true
    }, 
    instructions:{
        type: String,
        required: true
    },
    time:{
        type: String,
        
    },
    coverImage:{
        url: String,
        filename: String,
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref: "User"
    }

},{timestamps:true})
module.exports = mongoose.model('Recipe',recipeSchema);