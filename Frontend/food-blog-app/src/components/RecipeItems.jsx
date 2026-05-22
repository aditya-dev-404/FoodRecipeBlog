import React from 'react'
import recipeImage from '../assets/image3.png';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function RecipeItems({ recipes }) {
    const [allRecipes, setAllRecipes] = useState([]);
    const [favItems, setFavItems] = useState([]);
    const BASE_URL = "http://localhost:8080"

    // Set recipes from props (loader data)
    useEffect(() => {
        setAllRecipes(recipes || []);
    }, [recipes]);

    // Fetch user's favorite IDs
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return; // No token, skip fetching favorites

                const res = await axios.get(`${BASE_URL}/user/favourites`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                // Backend returns populated recipe objects, extract IDs
                const favoriteIds = res.data.map(recipe => recipe._id);
                setFavItems(favoriteIds);
            } catch (err) {
                console.error("Failed to fetch favorites", err);
            }
        };
        fetchFavorites();
    }, []);

    const onDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/recipe/${id}`);
            alert("Recipe deleted successfully");
            
            // Remove from state
            setAllRecipes((prev) => prev.filter((r) => r._id !== id));
            setFavItems((prev) => prev.filter(favId => favId !== id));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete recipe");
        }
    };

    const favRecipe = async (item) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to add favorites");
            return;
        }

        try {
            if (favItems.includes(item._id)) {
                // Remove from favorites
                await axios.delete(`${BASE_URL}/user/fav/${item._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavItems(prev => prev.filter(id => id !== item._id));
            } else {
                // Add to favorites
                await axios.post(`${BASE_URL}/user/fav/${item._id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavItems(prev => [...prev, item._id]);
            }
        } catch (err) {
            console.error("Failed to update favorites:", err);
            alert("Failed to update favorites");
        }
    };

    // Check if we're on the "My Recipe" page
    let path = window.location.pathname === "/myRecipe";

    return (
        <div className="card-container">
            {
                allRecipes?.map((item, index) => {
                    return (
                        <Link to={`/recipe/${item._id}`} key={index} className="card">
                            <img 
                                src={item.coverImage?.url || recipeImage} 
                                alt={item.title} 
                                width="120px" 
                                height="100px" 
                            />
                            <div className="card-body">
                                <div className="title">
                                    {item.title}
                                </div>
                                <div className="icons">
                                    <div className="timer">
                                        <BsStopwatchFill /> {item.time}
                                    </div>
                                    {path ? (
                                        <div className="action">
                                            <div className="delete">
                                                <MdDelete
                                                    className='deleteIcon'
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        onDelete(item._id);
                                                    }}
                                                />
                                            </div>
                                            <Link 
                                                to={`/editRecipe/${item._id}`} 
                                                className="editIcon"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <FaEdit />
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="heart">
                                            <FaHeart
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    favRecipe(item);
                                                }}
                                                style={{ 
                                                    color: favItems.includes(item._id) ? "red" : "gray",
                                                    cursor: "pointer"
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}