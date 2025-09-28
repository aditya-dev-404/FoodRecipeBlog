const Recipes = require("../models/recipe.js");



const getRecipes = async (req, res) => {
    const recipes = await Recipes.find();
    return res.json(recipes);
}




const getRecipe = async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipes.findById(id);
    return res.json(recipe);
}



const addRecipe = async (req, res) => {
    const { title, ingredients, instructions, time } = req.body;
    // console.log(req.body);
    if (!title || !ingredients || !instructions) {
        return res.json({ message: 'require fields cant be empty!' });
    }

    const newRecipe = await Recipes.create({
        title, ingredients, instructions, time
    })
    return res.json(newRecipe);
}

const editRecipe = async (req, res) => {
    const { id } = req.params;
    const { title, ingredients, instructions, time } = req.body;

    let recipe = await Recipes.findById(id);
    try {
        if (recipe) {
            await Recipes.findByIdAndUpdate(id, req.body, { new: true });
            return res.json({ title, ingredients, instructions, time });
        }
    } catch (err) {
        return res.status(404).json({ message: "This recipe doesnt exists." });
    }
}
const deleteRecipe = (req, res) => {
    res.json({});
}
module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe }    