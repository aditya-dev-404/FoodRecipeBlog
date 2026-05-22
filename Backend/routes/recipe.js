const express = require("express")
const router = express.Router()
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe } 
= require("../controllers/recipe")
const { upload } = require("../config/cloudinary.js");
const verifyToken = require("../middlewares/auth.js");


router.get("/", getRecipes);//to get all the recipes
router.get("/:id", getRecipe);//to get the individual recipe

router.post("/", verifyToken, upload.single("coverImage"), addRecipe);//to add new Recipe
router.put("/:id", upload.single("coverImage"), editRecipe);//to edit individual recipe
router.delete("/:id", deleteRecipe);//to delete individual recipe


module.exports = router