import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function RecipeDetail() {
  const recipe = useLoaderData();

  if (!recipe) return <h2>Loading...</h2>;

  return (
  <div className="recipe-details" id="recipe-details-container">
  <h1 id="recipe-details-title">{recipe.title}</h1>
  <img id="recipe-details-image" src={recipe.coverImage?.url} alt={recipe.title} />
  <p><b>Cooking Time:</b> {recipe.time}</p>
  <p><b>Ingredients:</b> {recipe.ingredients.join(', ')}</p>
  <p><b>Instructions:</b> {recipe.instructions}</p>
</div>
  );
}
