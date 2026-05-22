/* This code snippet is a React component named `AddFoodRecipe` that allows users to add a new food
recipe. Here's a breakdown of what the code is doing: */
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/* This code snippet defines a React functional component named `AddFoodRecipe`. Within this component,
the following state variables are initialized using the `useState` hook:
- `image`: Stores the selected image file for the recipe.
- `preview`: Stores the preview image URL to display a preview of the selected image.
- `loading`: Manages the loading state when submitting the recipe form.
- `error`: Stores any error messages that occur during form submission.
- `recipeData`: Stores the recipe data entered by the user.
- `navigate`: Utilizes the `useNavigate` hook from 'react-router-dom' for navigation within the
application. */

export default function AddFoodRecipe() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [recipeData, setRecipeData] = useState({});
    const navigate = useNavigate();
    const BASE_URL = "https://foodrecipeblogapp.onrender.com"

    const handleOnChange = (event) => {
        let val = (event.target.name === "ingredients") ? event.target.value.split(",") : event.target.value;
        setRecipeData(pre => ({ ...pre, [event.target.name]: val }));
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

// In your handleOnSubmit function, after successful recipe creation:
/**
 * The handleOnSubmit function is used to submit a recipe form data to a server, including user
 * authentication and error handling.
 * @returns The `handleOnSubmit` function is being returned.
 */
const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!token || !user) {
            setError('Please login first');
            return;
        }

        const formData = new FormData();
        formData.append('title', recipeData.title);
        formData.append('ingredients', JSON.stringify(recipeData.ingredients));
        formData.append('instructions', recipeData.instructions);
        formData.append('time', recipeData.time);
        formData.append('createdBy', user._id); // Ensure createdBy is set
        
        if (image) {
            formData.append('coverImage', image);
        }
        
        await axios.post(`${BASE_URL}/recipe`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });

        navigate("/");
        
    } catch (err) {
        setError(err.response?.data?.error || 'Failed to add recipe');
    } finally {
        setLoading(false);
    }
}

    return (
        <>
            <div className="container">
                <form action="" className="form" onSubmit={handleOnSubmit}>
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' className='input' name='title' onChange={handleOnChange} />
                    </div>

                    <div className="form-control">
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea type="text" id='ingredients' className='input' name='ingredients' onChange={handleOnChange}></textarea>
                    </div>

                    <div className="form-control">
                        <label htmlFor="instructions">Instructions</label>
                        <textarea type="text" id='instructions' className='input-textarea' name='instructions' onChange={handleOnChange}></textarea>
                    </div>

                    <div className="form-control">
                        <label htmlFor="image">Recipe Image</label>
                        <input type="file" id="image" className="input" name="coverImage" accept="image/*" onChange={handleImageChange} />
                        {preview && (
                            <div style={{ marginTop: '10px' }}>
                                <img src={preview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                            </div>
                        )}
                    </div>

                    <div className="form-control">
                        <label htmlFor="time">Time</label>
                        <input type="text" id='time' className='input' name='time' onChange={handleOnChange} />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type='submit' disabled={loading}>
                        {loading ? 'Adding Recipe...' : 'Add Recipe'}
                    </button>
                </form>

            </div>
        </>
    )
}


