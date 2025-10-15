import React from 'react'
import foodRecipeImage from '../assets/image1.png';
import RecipeItems from '../components/RecipeItems';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';


export default function Home() {
    const navigate = useNavigate();
    const recipes = useLoaderData(); // CRITICAL: Get data from loader
    const [isOpen, setIsOpen] = useState(false);
    
    const addRecipe = () => {
        let token = localStorage.getItem("token")
        if(token){
            navigate("/addRecipe");
        } else {
            setIsOpen(true);
        }
    }
    
    return (
        <>
            <section className="home">
                <div className="left">
                    <h1>Food Recipe</h1>
                    <h5>Lorem ipsum dolor sit amet.
                    Repellendus, odit! Ratione, eius maxime.
                    Dolorum, architecto? Ab, vitae vero!
                    Veritatis, adipisci tempore. Quidem, molestiae.
                    Tenetur dicta nostrum tempore eligendi?</h5>
                    <button onClick={addRecipe}>Share Your recipe</button>
                </div>
                <div className="right">
                    <img src={foodRecipeImage} alt="recipe image" width="300px" height="300px" />
                </div>
            </section>
            <div className="bg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,288L24,245.3C48,203,96,117,144,90.7C192,64,240,96,288,133.3C336,171,384,213,432,224C480,235,528,213,576,176C624,139,672,85,720,74.7C768,64,816,96,864,101.3C912,107,960,85,1008,69.3C1056,53,1104,43,1152,58.7C1200,75,1248,117,1296,122.7C1344,128,1392,96,1416,80L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
            </div>
            <div className="recipe">
                {/* Pass recipes from loader to RecipeItems */}
                <RecipeItems recipes={recipes} />
            </div>
            {(isOpen) && <Modal onClose={() => setIsOpen(false)}> <InputForm setIsOpen={() => setIsOpen(false)} /> </Modal>}
        </>
    )
}