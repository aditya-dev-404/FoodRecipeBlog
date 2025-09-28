require("dotenv").config();

const express = require("express");
const app = express();




const PORT = process.env.PORT || 3000
const connectionDataBase = require('./config/connectionDb.js');
connectionDataBase();
app.use(express.json());


const recipeRouters = require("./routes/recipe.js")
const userRouters = require("./routes/user.js")



app.use("/recipe",recipeRouters)
app.use("/user",userRouters);




app.listen(PORT,()=>{
    console.log(`listening to port ${PORT} 🚀`);
})