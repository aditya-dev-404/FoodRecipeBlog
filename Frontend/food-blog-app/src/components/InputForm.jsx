import React from 'react'
import { useState } from 'react';
import axios from 'axios';


export default function InputForm({ setIsOpen, setToken }) {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState("");

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        let endpoint = (isSignup) ? "signup" : "login";
        await axios.post(`http://localhost:8080/user/${endpoint}`, { username, email, password })
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                if (setToken) setToken(res.data.token);
                setIsOpen();
            }).catch(data => setError(data.response?.data?.error))
    }
    return (
        <>
            <form action="" className="form" onSubmit={handleOnSubmit}>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' className='input' onChange={(event) => { setUserName(event.target.value) }} required />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' className='input' onChange={(event) => { setEmail(event.target.value) }} required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="Password" id='password' className='input' onChange={(event) => { setPass(event.target.value) }} required />
                </div>
                <button type='submit'>{(isSignup) ? "Sign Up" : "Login"}</button>
                <br />
                {(error != "") && <h6 className="error">{error}</h6>}
                <p onClick={() => setIsSignup(!isSignup)}>{(isSignup) ? "Already have an account!" : "Create New Account"}</p>
            </form>
        </>
    )
}
