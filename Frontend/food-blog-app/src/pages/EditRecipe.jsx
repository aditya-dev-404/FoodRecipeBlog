import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function EditRecipe() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [recipeData, setRecipeData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const BASE_URL = "https://foodrecipeblog.onrender.com";



    useEffect(() => {
        const getData = async () => {
            await axios.get(`${BASE_URL}/recipe/${id}`)
                .then(response => {
                    let res = response.data;
                    setRecipeData({
                        title: res.title,
                        ingredients: res.ingredients.join(","),
                        instructions: res.instructions,
                        time: res.time
                    })
                    if (res.coverImage?.url) {
                        setPreview(res.coverImage.url);
                   }
                })         
        }
        getData();
    }, [id])

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

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');

            // Create FormData to send file + data
            const formData = new FormData();
            formData.append('title', recipeData.title);
            formData.append('ingredients', JSON.stringify(recipeData.ingredients));
            formData.append('instructions', recipeData.instructions);
            formData.append('time', recipeData.time);

            // Append image if exists
            if (image) {
                formData.append('coverImage', image);
            }

            await axios.put(`${BASE_URL}/recipe/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });


            navigate("/");

        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add recipe');
            console.error('Error:', err);
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
                        <input type="text" id='title' className='input' name='title' value={recipeData.title || ""} onChange={handleOnChange} />
                    </div>

                    <div className="form-control">
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea type="text" id='ingredients' className='input' name='ingredients' value={recipeData.ingredients || ""} onChange={handleOnChange}></textarea>
                    </div>

                    <div className="form-control">
                        <label htmlFor="instructions">Instructions</label>
                        <textarea type="text" id='instructions' className='input-textarea' name='instructions' value={recipeData.instructions || ""} onChange={handleOnChange}></textarea>
                    </div>

                    <div className="form-control">
                        <label htmlFor="image" id='imageLabel'>Recipe Image</label>
                        <input type="file" id="image" className="input" name="coverImage" accept="image/*" onChange={handleImageChange} />
                        {preview && (
                            <div style={{ marginTop: '10px' }}>
                                <img src={preview} alt="Preview" style={{ maxWidth: '70px', maxHeight: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                            </div>
                        )}
                    </div>

                    <div className="form-control">
                        <label htmlFor="time">Time</label>
                        <input type="text" id='time' className='input' name='time' value={recipeData.time || ""} onChange={handleOnChange} />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type='submit' disabled={loading}>
                        {loading ? 'Editing Recipe...' : 'Edit Recipe'}
                    </button>
                </form>

            </div>
        </>
    )
}
