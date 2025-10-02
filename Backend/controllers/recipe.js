const Recipes = require("../models/recipe.js");
const { cloudinary } = require("../config/cloudinary.js");

// 📌 Get all recipes
const getRecipes = async (req, res) => {
    const recipes = await Recipes.find();
    return res.json(recipes);
};

// 📌 Get single recipe
const getRecipe = async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipes.findById(id);
    return res.json(recipe);
};

// 📌 Add recipe
const addRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time } = req.body;

        // Ingredients can come as JSON string or array
        const parsedIngredients = typeof ingredients === "string"
            ? JSON.parse(ingredients)
            : ingredients;

        const newRecipe = await Recipes.create({
            title,
            ingredients: parsedIngredients,
            instructions,
            time,
            coverImage: req.file
                ? { url: req.file.path, filename: req.file.filename } // from Cloudinary
                : { url: "/default.jpg", filename: "default" },       // fallback
            createdBy: req.userId || null
        });

        return res.status(201).json({
            message: "Recipe created successfully",
            recipe: newRecipe
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to create recipe" });
    }
};


// 📌 Edit recipe (with optional image replacement)
const editRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, ingredients, instructions, time } = req.body;

        const recipe = await Recipes.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // If new image uploaded → delete old image from Cloudinary
        if (req.file && recipe.coverImage?.filename) {
            await cloudinary.uploader.destroy(recipe.coverImage.filename);
            recipe.coverImage = { url: req.file.path, filename: req.file.filename };
        }

        // Update other fields
        recipe.title = title || recipe.title;
        recipe.ingredients = ingredients ? JSON.parse(ingredients) : recipe.ingredients;
        recipe.instructions = instructions || recipe.instructions;
        recipe.time = time || recipe.time;

        const updatedRecipe = await recipe.save();

        res.status(200).json({
            message: "Recipe updated successfully",
            recipe: updatedRecipe
        });

    } catch (err) {
        console.error("Edit recipe error:", err);
        res.status(500).json({ message: "Failed to update recipe" });
    }
};

// 📌 Delete recipe
const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipes.findById(id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Delete image from Cloudinary if exists
        if (recipe.coverImage?.filename) {
            await cloudinary.uploader.destroy(recipe.coverImage.filename);
        }

        await Recipes.findByIdAndDelete(id);

        res.json({ message: "Recipe deleted successfully" });
    } catch (err) {
        console.error("Delete recipe error:", err);
        res.status(500).json({ message: "Failed to delete recipe" });
    }
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe };
