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
    // let favItems = JSON.parse(localStorage.getItem("fav"))??[]
    const [favItems, setFavItems] = useState(() => JSON.parse(localStorage.getItem("fav")) ?? []);

    useEffect(()=>{
        setAllRecipes(recipes)
    },[recipes])

    const onDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/recipe/${id}`);
            alert("Recipe deleted successfully");
            // remove from state OR navigate
            setAllRecipes((prev) => prev.filter((r) => r._id !== id));
            let filterItem = favItems.filter(recipe=>recipe._id !== id)
            localStorage.setItem("fav", JSON.stringify(filterItem))
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };
    const favRecipe = (item) => {
    let updatedFavs;
    if (favItems.some(recipe => recipe._id === item._id)) {
        // remove
        updatedFavs = favItems.filter(recipe => recipe._id !== item._id);
    } else {
        // add
        updatedFavs = [...favItems, item];
    }
    setFavItems(updatedFavs);
    localStorage.setItem("fav", JSON.stringify(updatedFavs));
};


    let path = window.location.pathname === "/myRecipe" ? true : false;
    return (
        <div className="card-container">
            {
                allRecipes?.map((item, index) => {
                    return (
                        <div key={index} className="card">
                            <img src={item.coverImage?.url || recipeImage} alt={item.title} width="120px" height="100px" />
                            <div className="card-body">
                                <div className="title">
                                    {item.title}
                                </div>
                                <div className="icons">
                                    <div className="timer"><BsStopwatchFill /> {item.time}</div>
                                    {path ? <div className="action">
                                        <div className="delete"><MdDelete className='deleteIcon' onClick={() => onDelete(item._id)} /></div>
                                        <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                    </div> :
                                        <div className="heart"><FaHeart onClick={()=>favRecipe(item)} style={{color:(favItems).some(res => res._id === item._id) ? "red": ""}}/></div>}
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
