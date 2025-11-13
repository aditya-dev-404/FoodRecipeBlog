import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx'
import MainNavigation from './components/MainNavigation.jsx';
import axios from 'axios'
import AddFoodRecipe from './pages/AddFoodRecipe.jsx';
import EditRecipe from './pages/EditRecipe.jsx';
import RecipeDetail from './pages/RecipeDetails.jsx';

// Get all recipes
const getAllRecipes = async () => {
  try {
    const res = await axios.get('https://foodrecipeblog-1.onrender.com/recipe');
    return res.data;
  } catch (err) {
    console.error("Failed to fetch recipes:", err);
    return [];
  }
}

// Get recipe by ID
const getRecipeById = async ({ params }) => {
  try {
    const res = await axios.get(`https://foodrecipeblog-1.onrender.com/recipe/${params.id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch recipe:", err);
    throw new Response("Recipe not found", { status: 404 });
  }
};

// Get user's own recipes
const getMyRecipes = async () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!token || !user) {
      alert("Please login to view your recipes");
      window.location.href = "/";
      return [];
    }

    const allRecipes = await getAllRecipes();
    
    // Debug: Check what we're comparing
    console.log("User ID:", user.id || user._id);
    console.log("First recipe createdBy:", allRecipes[0]?.createdBy);
    
    // Try both user.id and user._id, and convert createdBy to string
    const userId = user.id || user._id;
    const myRecipes = allRecipes.filter(item => {
      const createdById = typeof item.createdBy === 'object' ? item.createdBy._id : item.createdBy;
      return createdById?.toString() === userId?.toString();
    });
    
    console.log("Filtered recipes:", myRecipes.length);
    return myRecipes;
  } catch (err) {
    console.error("Failed to fetch user recipes:", err);
    return [];
  }
}

// Get user's favorite recipes
const getFavRecipes = async () => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Please login to view favorites");
      window.location.href = "/";
      return [];
    }
    
    const res = await axios.get("https://foodrecipeblog-1.onrender.com/user/favourites", {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Backend returns populated recipe objects
    return res.data;
  } catch (err) {
    console.error("Failed to fetch favorites:", err);
    
    if (err.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("Session expired. Please login again.");
      window.location.href = "/";
    }
    
    return [];
  }
};

const router = createBrowserRouter([
  {
    path: "/", 
    element: <MainNavigation />, 
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "addRecipe", element: <AddFoodRecipe /> },
      { path: "editRecipe/:id", element: <EditRecipe /> },
      { path: "recipe/:id", element: <RecipeDetail />, loader: getRecipeById }
    ]
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}