import React from 'react'
import { useLoaderData } from 'react-router-dom';
import recipeImage from '../assets/image3.png';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';



export default function RecipeItems() {
    const recipes = useLoaderData()
    const [allRecipes, setAllRecipes] = useState([]);
    const [favItems, setFavItems] = useState([]);
    useEffect(() => {
        setAllRecipes(recipes);
    }, [recipes]);
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8080/user/favourites", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavItems(res.data); // array of recipe IDs
            } catch (err) {
                console.error("Failed to fetch favorites", err);
            }
        };
        fetchFavorites();
    }, []);


    const onDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/recipe/${id}`);
            alert("Recipe deleted successfully");
            // remove from state OR navigate
            setAllRecipes((prev) => prev.filter((r) => r._id !== id));
            let filterItem = favItems.filter(recipe => recipe._id !== id)
            localStorage.setItem("fav", JSON.stringify(filterItem))
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };
    const favRecipe = async (item) => {
        const token = localStorage.getItem("token");
        try {
            if (favItems.includes(item._id)) {
                await axios.delete(`http://localhost:8080/user/fav/${item._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavItems(prev => prev.filter(id => id !== item._id));
            } else {
                await axios.post(`http://localhost:8080/user/fav/${item._id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavItems(prev => [...prev, item._id]);
            }
        } catch (err) {
            console.error(err);
        }
    };



    let path = window.location.pathname === "/myRecipe" ? true : false;
    return (
        <div className="card-container">
            {
                allRecipes?.map((item, index) => {
                    return (
                        // <div key={index} className="card">
                        <Link to={`/recipe/${item._id}`} key={index} className="card">
                            <img src={item.coverImage?.url || recipeImage} alt={item.title} width="120px" height="100px" />
                            <div className="card-body">
                                <div className="title">
                                    {item.title}
                                </div>
                                <div className="icons">
                                    <div className="timer"><BsStopwatchFill /> {item.time}</div>
                                    {path ? <div className="action">
                                        <div className="delete"><MdDelete
                                            className='deleteIcon'
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent Link navigation
                                                e.stopPropagation(); // Stop event bubbling
                                                onDelete(item._id);
                                            }}
                                        /></div>
                                        <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                    </div> :
                                        <div className="heart"><FaHeart
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                favRecipe(item);
                                            }}
                                            style={{ color: favItems.includes(item._id) ? "red" : "" }}
                                        /> </div>}
                                </div>

                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

