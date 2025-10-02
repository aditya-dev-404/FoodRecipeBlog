import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx'
import MainNavigation from './components/MainNavigation.jsx';
import axios from 'axios'
import AddFoodRecipe from './pages/AddFoodRecipe.jsx';
import EditRecipe from './pages/EditRecipe.jsx';


const getAllRecipes = async () => {
  let allRecipes = [];
  await axios.get('http://localhost:8080/recipe')
    .then(res => {
      allRecipes = res.data
    })
  return allRecipes
}

const getMyRecipes = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const allRecipes = await getAllRecipes();
  return allRecipes.filter(item => item.createdBy.toString() === user.id); // make sure to use `user.id` or `_id`
}


const getFavRecipes = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:8080/user/favourites", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data; // returns array of recipe objects
};




const router = createBrowserRouter([
  {
    path: "/", element: <MainNavigation />, children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "addRecipe", element: <AddFoodRecipe /> },
      { path: "editRecipe/:id", element: <EditRecipe /> }
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
