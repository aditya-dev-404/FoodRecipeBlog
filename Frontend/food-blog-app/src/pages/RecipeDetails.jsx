import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function RecipeDetail() {
  const recipe = useLoaderData();

  if (!recipe) return <h2>Loading...</h2>;

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <img src={recipe.coverImage?.url} alt={recipe.title} width="400" />
      <p><b>Cooking Time:</b> {recipe.time}</p>
      <p><b>Ingredients:</b> {recipe.ingredients}</p>
      <p><b>Instructions:</b> {recipe.instructions}</p>
    </div>
  );
}
