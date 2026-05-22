require("dotenv").config();

const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors({
    origin: "https://recipesblogap.netlify.app",
    credentials: true
}));
const PORT = process.env.PORT || 3000
const connectionDataBase = require('./config/connectionDb.js');
connectionDataBase();
app.use(express.json());

const recipeRouters = require("./routes/recipe.js")
const userRouters = require("./routes/user.js")

app.use("/user",userRouters);
app.use("/recipe",recipeRouters)

app.listen(PORT,()=>{
    console.log(`listening to port ${PORT} 🚀`);
})