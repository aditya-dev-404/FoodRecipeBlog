import React from 'react'
import { useState } from 'react'
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);
  const navigate = useNavigate();


  useEffect(() => {
    setIsLogin(token ? false : true)
  }, [token])
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
      navigate('/');
    } else {
      setIsOpen(true);
    }
  }
  return (
    <>
      <header>
        <h2>Food Blog</h2>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/favRecipe" : "/"}>Favourites</NavLink></li>
          <li onClick={checkLogin}><p className='login' >{(isLogin) ? "Login" : user.username}</p></li>
        </ul>
      </header>
      {(isOpen) && <Modal onClose={() => setIsOpen(false)}> <InputForm setIsOpen={() => setIsOpen(false)} /> </Modal>}
    </>
  )
}
