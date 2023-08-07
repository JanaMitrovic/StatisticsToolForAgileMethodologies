import React from 'react'
import loginImg from "../images/loginImg.jpg"
import "../styles/login.css"
import { useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const [email, setEmail] = useState("");
    const [emailError, setEErorr] = useState("Use Atlassian account email");
    
    function isValidEmail(email){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    const validateEmail = event => {
        if(!isValidEmail(event.target.value)){
            setEErorr("Email is not in valid form");
        }else{
            setEErorr("Email is valid!");
        }
        setEmail(event.target.value)
    }

    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        if(emailError === "Email is valid!" && password !== ""){
            axios.post('http://localhost:8000/login', {email: email, password: password})
            .then(res => {
                if(res.data.Login){
                    localStorage.setItem("token", res.data.token)
                    navigate('/home')
                }else{
                    alert("Cannot find user")
                }
        })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className="login-card">
            <img src={loginImg}/>
            <h2>Log in</h2>
            <form className="login-form" action="" onSubmit={login}>
                <input
                    className={`control ${emailError}`}
                    type="email"
                    placeholder="Email"
                    onChange={validateEmail}
                    htmlFor = "email"
                />
                <input
                    name="password"
                    className="control"
                    type="password"
                    placeholder="Password"
                    maxLength={8}
                    onChange={event => setPassword(event.target.value)}
                />

                <button className="login" type="submit">LOG IN</button>
                <p>You don't have account yet?</p>
                <Link to='/register'>
                    <button className="register" type="button">REGISTER</button> 
                </Link>
            </form>
    </div>
    )
}

export default LoginPage
