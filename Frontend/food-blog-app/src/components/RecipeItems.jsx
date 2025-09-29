import React from 'react'
import { useLoaderData } from 'react-router-dom';
import recipeImage from '../assets/image3.png';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";


export default function RecipeItems() {
    const allRecipes = useLoaderData()
  return (
    <div className="card-container">
        {
            allRecipes?.map((item, index)=>{
                return(
                    <div key={index} className="card">
                        <img src={recipeImage} alt="recipe Image" width="120px" height="100px"/>
                        <div className="card-body">
                            <div className="title">
                                {item.title}
                            </div>
                            <div className="icons">
                                <div className="timer"><BsStopwatchFill />30 min</div>
                                <div className="heart"><FaHeart/></div>
                            </div>

                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}
