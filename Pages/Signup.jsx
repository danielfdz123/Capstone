import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './Signup.css';

const Signup = () => {
    const [accountInfo, setAccountInfo] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
    };

    const createAccount = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
        .from('Accounts')
        .insert({
            username: accountInfo.username,
            email: accountInfo.email,
            password: accountInfo.password,
            created_at: new Date().toISOString()
        });
            if (error) {
            console.error('Creat account error:', error.message);
            return;
        }
        console.log('Account created:', data);
        window.location = '/';
    };


    return (
        <div className = "signupBox">
            <img src = 'logo.png' className = 'logoImg'/>
            <form onSubmit = {createAccount}>
            <p className = "signupHeading"> Fill out the form below to create an account! </p>

            <div className = "signupForm">            
                {/* CREATE USERNAME */}
                <h2> Username: </h2>
                <input
                    type = "text"
                    name = "username"
                    value = {accountInfo.username}
                    onChange = {handleChange}
                    required
                />

                {/* ENTER EMAIL */}
                <h2> Email: </h2>
                <input
                    type = "email"
                    name = "email"
                    value = {accountInfo.email}
                    onChange = {handleChange}
                    required
                />
                
                {/* CREATE PASSWORD */}
                <h2> Password: </h2>
                <input
                    type = "password"
                    name = "password"
                    value = {accountInfo.password}
                    onChange = {handleChange}
                    required
                />

                {/* SUBMIT BUTTON */}
                    <div className = "createAccDiv">
                        <button className = "createAccButton" type="submit"> Create Account </button>
                    </div>
                </div>
            </form>

            <p className = "bottomText"> Already have an account?&nbsp;
                <Link className = "bottomText" to = "/"> 
                    Login here 
                </Link> 
            </p>
        </div>
    );
};

export default Signup;
